/**
 * Created by an.han on 15/2/23.
 */

var url = location.href;

({
    init: function () {
        this.bindEvents();
        this.initScripts();
    },

    initScripts: function () {
        var self = this;
        chrome.storage.sync.get('scripts', function (data) {
            (data.scripts || []).forEach(function (item) {
                if (item.reg) {
                    if (new RegExp(item.req).test(url)) {
                        self.append(item.res);
                    }
                }
                else {
                    if (item.req == url) {
                        self.append(item.res);
                    }
                }
            });
        });
    },

    append: function (value) {
        var el = document.createElement('script');
        if (/(^https?|^file):\/\/.+/.test(value)) {
            el.src = value;
        }
        else {
            el.innerHTML = value;
        }
        document.head.appendChild(el);
    },

    bindEvents: function () {
        var self = this;
        chrome.storage.onChanged.addListener(function(changes, namespace) {
            //self.initScripts();
        });
    }

}).init();
