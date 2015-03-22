var Engine3D;
(function (Engine3D) {
    var Loader = (function () {
        function Loader() {
            this._count = null;
            this._total = null;
            this._resourceContainer = null;
            this._onload = null;
            this._resourceContainer = {};
            this._count = 0;
        }
        Loader.prototype.load = function (resourceArr) {
            var i = null;
            var self = this;
            this._total = resourceArr.length;
            resourceArr.forEach(function (obj) {
                var image = new Image();
                image.src = obj.src;
                image.onload = function () {
                    self._resourceContainer[obj.id] = this;
                    self._count = self._count + 1;
                };
            });
            //todo 待重构
            setTimeout(function () {
                if (self._count === self._total) {
                    self._onload();
                    return;
                }
                console.log("资源未加载完");
                //}, 2000);
            }, 100);
        };
        Loader.prototype.getResource = function (id) {
            return this._resourceContainer[id];
        };
        Object.defineProperty(Loader.prototype, "onload", {
            set: function (onload) {
                this._onload = onload;
            },
            enumerable: true,
            configurable: true
        });
        Loader.create = function () {
            var obj = new Loader();
            return obj;
        };
        return Loader;
    })();
    Engine3D.Loader = Loader;
})(Engine3D || (Engine3D = {}));
//# sourceMappingURL=Loader.js.map