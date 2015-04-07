var Engine3D;
(function (Engine3D) {
    //todo 将gl和c作为公有成员
    var Webgl = (function () {
        function Webgl() {
        }
        Webgl.prototype.init = function () {
            // canvas对象获取
            window.c = document.getElementById('canvas');
            // webgl的context获取
            window.gl = window.c.getContext('webgl') || window.c.getContext('experimental-webgl');
            window.gl.canvas = window.c;
        };
        Webgl.prototype.initWhenCreate = function () {
        };
        Webgl.create = function () {
            var obj = new Webgl();
            obj.initWhenCreate();
            return obj;
        };
        return Webgl;
    })();
    Engine3D.Webgl = Webgl;
})(Engine3D || (Engine3D = {}));
//# sourceMappingURL=Webgl.js.map