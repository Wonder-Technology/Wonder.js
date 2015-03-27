var Engine3D;
(function (Engine3D) {
    var Light;
    (function (Light) {
        //export class Attenuation{
        //
        //}
        //export class BaseLight{
        //
        //}
        //
        var PointLight = (function () {
            function PointLight(position, color, intensity) {
                this._position = null;
                this._color = null;
                this._intensity = null;
                this._position = position;
                this._color = color;
                this._intensity = intensity;
            }
            Object.defineProperty(PointLight.prototype, "position", {
                get: function () {
                    return this._position;
                },
                set: function (position) {
                    this._position = position;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(PointLight.prototype, "color", {
                get: function () {
                    return this._color;
                },
                set: function (color) {
                    this._color = color;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(PointLight.prototype, "intensity", {
                get: function () {
                    return this._intensity;
                },
                set: function (intensity) {
                    this._intensity = intensity;
                },
                enumerable: true,
                configurable: true
            });
            PointLight.prototype.initWhenCreate = function () {
            };
            PointLight.create = function (position, color, intensity) {
                var obj = new this(position, color, intensity);
                obj.initWhenCreate();
                return obj;
            };
            return PointLight;
        })();
        Light.PointLight = PointLight;
        var DirectionLight = (function () {
            function DirectionLight(direction, color, intensity) {
                this._direction = null;
                this._color = null;
                this._intensity = null;
                this._direction = direction;
                this._color = color;
                this._intensity = intensity;
            }
            Object.defineProperty(DirectionLight.prototype, "direction", {
                get: function () {
                    return this._direction;
                },
                set: function (direction) {
                    this._direction = direction;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DirectionLight.prototype, "color", {
                get: function () {
                    return this._color;
                },
                set: function (color) {
                    this._color = color;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DirectionLight.prototype, "intensity", {
                get: function () {
                    return this._intensity;
                },
                set: function (intensity) {
                    this._intensity = intensity;
                },
                enumerable: true,
                configurable: true
            });
            DirectionLight.prototype.initWhenCreate = function () {
            };
            DirectionLight.create = function (direction, color, intensity) {
                var obj = new this(direction, color, intensity);
                obj.initWhenCreate();
                return obj;
            };
            return DirectionLight;
        })();
        Light.DirectionLight = DirectionLight;
    })(Light = Engine3D.Light || (Engine3D.Light = {}));
})(Engine3D || (Engine3D = {}));
//# sourceMappingURL=Light.js.map