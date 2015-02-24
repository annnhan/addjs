'use strict';
var reres = angular.module('reres', []);

reres.controller('mapListCtrl', function($scope, $timeout, $q) {

    //保存规则数据到storage
    function saveData() {
        chrome.storage.sync.set({'scripts': $scope.maps}, function () {});
    }

    // 获取数据
    (function () {
        var defer = $q.defer();
        defer.promise.then(function (data) {
            $scope.maps = data.scripts || [];
        });
        chrome.storage.sync.get('scripts', function (data) {
            defer.resolve(data);
        });
    })();

    //当前编辑的规则
    $scope.curRule = {
        req: '.*test\\.com',
        res: '',
        reg: false,
        checked: true
    }

    $scope.maps = [];

    //编辑框显示状态
    $scope.editDisplay = 'none';

    //编辑框保存按钮文本
    $scope.editType = '添加';

    //输入错误时候的警告
    $scope.inputError = '';

    //隐藏编辑框
    $scope.hideEditBox = function () {
        $scope.editDisplay = 'none';
    }

    //验证输入合法性
    $scope.virify = function () {
        if (!$scope.curRule.req || !$scope.curRule.res) {
            $scope.inputError = '输入不能为空';
            return false;
        }
        try {
            new RegExp($scope.curRule.req);
        } catch (e){
            $scope.inputError = 'req正则格式错误';
            return false;
        }
        $scope.inputError = '';
        return true;
    }

    // 点击添加按钮
    $scope.addRule = function () {
        if ($scope.editDisplay === 'none') {
            $scope.curRule = {
                req: '.*test\\.com',
                res: '',
                reg: false,
                checked: true
            }
            $scope.editType = '添加';
            $scope.editDisplay = 'block';
        } else {
            $scope.editType === '添加' && ($scope.editDisplay = 'none');
        }
    };

    //点击编辑按钮
    $scope.edit = function (rule) {
        $scope.curRule = rule;
        $scope.editType = '编辑';
        $scope.editDisplay = 'block';
    }

    //编辑后保存
    $scope.saveRule = function () {
        if ( $scope.virify() ) {
            if ($scope.editType === '添加') {
                $scope.maps.push($scope.curRule);
            } else {

            }
            saveData();
            $scope.editDisplay = 'none';
        }
    };

    //删除规则
    $scope.removeUrl = function (rule) {
        for (var i = 0, len = $scope.maps.length; i< len; i++) {
            if ($scope.maps[i] === rule) {
                $scope.maps.splice(i, 1);
            }
        }
        saveData();
    }

    //导出
    $scope.export = function () {
        function saveAs(blob, filename) {
            var type = blob.type;
            var force_saveable_type = 'application/octet-stream';
            if (type && type != force_saveable_type) { // 强制下载，而非在浏览器中打开
                var slice = blob.slice || blob.webkitSlice;
                blob = slice.call(blob, 0, blob.size, force_saveable_type);
            }

            var url = URL.createObjectURL(blob);
            var save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
            save_link.href = url;
            save_link.download = filename;

            var event = document.createEvent('MouseEvents');
            event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            save_link.dispatchEvent(event);
            URL.revokeObjectURL(url);
        }

        var URL = URL || webkitURL || window;
        var bb = new Blob([JSON.stringify($scope.maps, null, '\t')], {type: 'text/json'});
        saveAs(bb, 'runjs.json');
    }

    //导入
    document.getElementById('jsonFile').onchange = function () {
        var resultFile = this.files[0];
        if (resultFile) {
            var reader = new FileReader();
            reader.readAsText(resultFile);
            reader.onload = function (e) {
                try {
                    var data = JSON.parse(this.result);
                    $scope.maps.length = 0;
                    for (var i = 0, len = data.length; i < len; i++) {
                        $scope.maps.push(data[i]);
                    }
                    saveData();
                    location.reload();
                } catch (e) {
                    alert("导入失败，请检查文件格式是否正确");
                }
            };
        }
    }
});