var Engine3D;
(function (Engine3D) {
    var Light;
    (function (Light) {
        var Attenuation = (function () {
            function Attenuation(rangeLevel) {
                this._range = null;
                this._constant = null;
                this._linear = null;
                this._quadratic = null;
                this._rangeLevel = null;
                this._rangeLevel = rangeLevel;
            }
            Object.defineProperty(Attenuation.prototype, "range", {
                get: function () {
                    return this._range;
                },
                set: function (range) {
                    this._range = range;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Attenuation.prototype, "constant", {
                get: function () {
                    return this._constant;
                },
                set: function (constant) {
                    this._constant = constant;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Attenuation.prototype, "linear", {
                get: function () {
                    return this._linear;
                },
                set: function (linear) {
                    this._linear = linear;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Attenuation.prototype, "quadratic", {
                get: function () {
                    return this._quadratic;
                },
                set: function (quadratic) {
                    this._quadratic = quadratic;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Attenuation.prototype, "rangeLevel", {
                get: function () {
                    return this._rangeLevel;
                },
                set: function (rangeLevel) {
                    this._rangeLevel = rangeLevel;
                },
                enumerable: true,
                configurable: true
            });
            Attenuation.prototype.initWhenCreate = function () {
                this._constant = 1.0;
                switch (this._rangeLevel) {
                    case 0:
                        this._range = 7;
                        this._linear = 0.7;
                        this._quadratic = 1.8;
                        break;
                    case 1:
                        this._range = 13;
                        this._linear = 0.35;
                        this._quadratic = 0.44;
                        break;
                    case 2:
                        this._range = 20;
                        this._linear = 0.22;
                        this._quadratic = 0.20;
                        break;
                    case 3:
                        this._range = 32;
                        this._linear = 0.14;
                        this._quadratic = 0.07;
                        break;
                    case 4:
                        this._range = 50;
                        this._linear = 0.09;
                        this._quadratic = 0.032;
                        break;
                    case 5:
                        this._range = 65;
                        this._linear = 0.07;
                        this._quadratic = 0.017;
                        break;
                    case 6:
                        this._range = 100;
                        this._linear = 0.045;
                        this._quadratic = 0.0075;
                        break;
                    case 7:
                        this._range = 160;
                        this._linear = 0.027;
                        this._quadratic = 0.0028;
                        break;
                    case 8:
                        this._range = 200;
                        this._linear = 0.022;
                        this._quadratic = 0.0019;
                        break;
                    case 9:
                        this._range = 325;
                        this._linear = 0.014;
                        this._quadratic = 0.0007;
                        break;
                    case 10:
                        this._range = 600;
                        this._linear = 0.007;
                        this._quadratic = 0.0002;
                        break;
                    case 11:
                        this._range = 3250;
                        this._linear = 0.0014;
                        this._quadratic = 0.000007;
                        break;
                    default:
                        throw new Error("超出范围");
                        break;
                }
            };
            Attenuation.create = function (rangeLevel) {
                var obj = new this(rangeLevel);
                obj.initWhenCreate();
                return obj;
            };
            return Attenuation;
        })();
        Light.Attenuation = Attenuation;
        //export class BaseLight{
        //
        //}
        //
        var PointLight = (function () {
            function PointLight(position, color, intensity, attenuation) {
                this._attenuation = null;
                this._position = null;
                this._color = null;
                this._intensity = null;
                this._position = position;
                this._color = color;
                this._intensity = intensity;
                this._attenuation = attenuation;
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
            Object.defineProperty(PointLight.prototype, "range", {
                get: function () {
                    return this._attenuation.range;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(PointLight.prototype, "constant", {
                get: function () {
                    return this._attenuation.constant;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(PointLight.prototype, "linear", {
                get: function () {
                    return this._attenuation.linear;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(PointLight.prototype, "quadratic", {
                get: function () {
                    return this._attenuation.quadratic;
                },
                enumerable: true,
                configurable: true
            });
            PointLight.prototype.initWhenCreate = function () {
            };
            PointLight.create = function (position, color, intensity, attenuation) {
                var obj = new this(position, color, intensity, attenuation);
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