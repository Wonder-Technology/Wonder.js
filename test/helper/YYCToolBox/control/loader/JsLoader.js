/***********************************************  
加载js脚本控件JsLoader    v1.0 

作者：YYC
日期：2013-04-12
电子邮箱：395976266@qq.com
QQ: 395976266
博客：http://www.cnblogs.com/chaogex/
************************************************/
(function () {
    var JsLoader = YYC.Class({
        Init: function () {
        },
        Private: {
            _container: [],

            _loadJsSync: function (js, func) {
                var script = null;

                script = this._createScript(js);
                this._appendScript(script);

                this._onloadSync(js, script, func);
            },
            _loadJsAsync: function (js, func) {
                var script = null;

                script = this._createScript(js);
                this._appendScript(script);

                this._onloadAsync(js, script, func);
                this._loadNext(func);
            },
            _appendScript: function (script) {
                var head = document.getElementsByTagName("head")[0];

                head.appendChild(script);
            },
            _createScript: function (js) {
                var script = document.createElement("script");
                script.type = "text/javascript";
                script.src = js.src;

                return script;
            },
            _onloadSync: function (js, script, func) {
                var self = this;

                if (script.readyState) { //IE
                    script.onreadystatechange = function () {
                        if (script.readyState == "loaded" || script.readyState == "complete") {
                            script.onreadystatechange = null;
                            js.callback && js.callback.apply(js.obj, js.args);

                            self._loadNext(func);
                        }
                    };
                } else { //Others
                    script.onload = function () {
                        js.callback && js.callback.apply(js.obj, js.args);

                        self._loadNext(func);
                        //if (self._container.length == 0) {
                        //    return;
                        //}
                        //else {
                        //    func.call(self, null);
                        //}
                    };
                }
            },
            _onloadAsync: function (js, script, func) {
                var self = this;

                if (script.readyState) { //IE
                    script.onreadystatechange = function () {
                        if (script.readyState == "loaded" || script.readyState == "complete") {
                            script.onreadystatechange = null;
                            js.callback && js.callback.apply(js.obj, js.args);
                        }
                    };
                } else { //Others
                    script.onload = function () {
                        js.callback && js.callback.apply(js.obj, js.args);
                    };
                }
            },
            _loadNext: function (func) {
                if (this._container.length == 0) {
                    return;
                }
                else {
                    func.call(this, null);
                }
            }
        },
        Public: {
            add: function (src, callback, args, obj) {
                this._container.push({ src: src, callback: callback, args: args || [], obj: obj ? obj : window });

                return this;
            },
            loadSync: function () {
                if (this._container.length == 0) {
                    throw new Error("请先加入js");
                }
                var js = this._container.shift();

                this._loadJsSync(js, this.loadSync);
            },
            loadAsync: function () {
                if (this._container.length == 0) {
                    throw new Error("请先加入js");
                }
                var js = this._container.shift();

                this._loadJsAsync(js, this.loadAsync);
            },
            deferLoadSync: function (time) {
                var self = this;

                setTimeout(function () {
                    self.loadSync();
                }, time * 1000);
            },
            require: function (fileSrc, callback) {
                var script = document.createElement("script");

                if (script.readyState) { //IE
                    script.onreadystatechange = function () {
                        if (script.readyState == "loaded" || script.readyState == "complete") {
                            script.onreadystatechange = null;
                            callback && callback();
                        }
                    };
                } else { //Others
                    script.onload = function () {
                        callback && callback();
                    };
                }

                script.src = fileSrc;
                //script.type = "text/javascript";
                this._appendScript(script);
            },
            preload: (function () {
                var preload = null;

                if (YYC.Tool.judge.browser.isIE()) {
                    preload = function (fileSrc) {
                        new Image().src = fileSrc;  //灯塔模式
                    };
                }
                else {
                    preload = function (fileSrc) {
                        var obj = document.createElement("object"),
                            body = document.body;

                        obj.width = 0;
                        obj.height = 0;
                        obj.data = fileSrc;
                        body.appendChild(obj);
                    }
                }
            }())
        }
    });

    YYC.namespace("Control").JsLoader = JsLoader;
}());