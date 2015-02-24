'use strict';
var reres = angular.module('reres', []);

reres.controller('mapListCtrl', function ($scope, $timeout, $q) {

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

    //按钮框显示状态
//    $scope.btnDisplay = 'block';

    //编辑框保存按钮文本
    $scope.editType = '添加';

    //输入错误时候的警告
    $scope.inputError = '';

    //隐藏编辑框
    $scope.hideEditBox = function () {
        $scope.editDisplay = 'none';
//        $scope.btnDisplay = 'block';
    }

    //显示编辑框
    $scope.showEditBox = function () {
        $scope.editDisplay = 'block';
//        $scope.btnDisplay = 'none';
    }

    //验证输入合法性
    $scope.virify = function () {
        if (!$scope.curRule.req || !$scope.curRule.res) {
            $scope.inputError = '输入不能为空';
            return false;
        }
        try {
            new RegExp($scope.curRule.req)
        } catch (e) {
            $scope.inputError = 'req正则格式错误';
            return false;
        }
        $scope.inputError = '';
        return true;
    }

    // 点击添加按钮
    $scope.addRule = function () {
        var defer = $q.defer();
        defer.promise.then(function (tabs) {
            $scope.curRule = {
                req: tabs[0].url,
                res: '',
                reg: false,
                checked: true
            };
            $scope.editType = '添加';
            $scope.showEditBox();
        });
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            defer.resolve(tabs);
        });
    };

    //点击编辑按钮
    $scope.edit = function (rule) {
        $scope.curRule = rule;
        $scope.editType = '编辑';
        $scope.showEditBox();
    }

    //编辑后保存
    $scope.saveRule = function () {
        if ($scope.virify()) {
            if ($scope.editType === '添加') {
                $scope.maps.push($scope.curRule);
            } else {

            }
            saveData();
            $scope.hideEditBox();
        }
    };

    //删除规则
    $scope.removeUrl = function (rule) {
        for (var i = 0, len = $scope.maps.length; i < len; i++) {
            if ($scope.maps[i] === rule) {
                $scope.maps.splice(i, 1);
                break;
            }
        }
        saveData();
    }
});
