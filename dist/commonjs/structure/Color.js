"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var registerClass_1 = require("../definition/typescript/decorator/registerClass");
var contract_1 = require("../definition/typescript/decorator/contract");
var Vector3_1 = require("../math/Vector3");
var Vector4_1 = require("../math/Vector4");
var cache_1 = require("../definition/typescript/decorator/cache");
var wonder_expect_js_1 = require("wonder-expect.js");
var REGEX_RGBA = /^rgba\((\d+),\s*(\d+),\s*(\d+),\s*([^\)]+)\)$/i, REGEX_RGBA_2 = /^rgba\((\d+\.\d+),\s*(\d+\.\d+),\s*(\d+\.\d+),\s*([^\)]+)\)$/i, REGEX_RGB = /^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/i, REGEX_RGB_2 = /^rgb\((\d+\.\d+),\s*(\d+\.\d+),\s*(\d+\.\d+)\)$/i, REGEX_NUM = /^\#([0-9a-f]{6})$/i;
var Color = (function () {
    function Color() {
        this._r = null;
        this._g = null;
        this._b = null;
        this._a = null;
        this._colorString = null;
        this._colorVec3Cache = null;
        this._colorVec4Cache = null;
        this._colorArr3Cache = null;
    }
    Color_1 = Color;
    Color.create = function (colorVal) {
        var obj = new this();
        obj.initWhenCreate(colorVal);
        return obj;
    };
    Object.defineProperty(Color.prototype, "dirty", {
        set: function (dirty) {
            if (dirty) {
                this._clearCache();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color.prototype, "r", {
        get: function () {
            return this._r;
        },
        set: function (r) {
            if (this._r !== r) {
                this.dirty = true;
                this._r = r;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color.prototype, "g", {
        get: function () {
            return this._g;
        },
        set: function (g) {
            if (this._g !== g) {
                this.dirty = true;
                this._g = g;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color.prototype, "b", {
        get: function () {
            return this._b;
        },
        set: function (b) {
            if (this._b !== b) {
                this.dirty = true;
                this._b = b;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color.prototype, "a", {
        get: function () {
            return this._a;
        },
        set: function (a) {
            if (this._a !== a) {
                this.dirty = true;
                this._a = a;
            }
        },
        enumerable: true,
        configurable: true
    });
    Color.prototype.initWhenCreate = function (colorVal) {
        if (!colorVal) {
            return;
        }
        this._colorString = colorVal;
        this._setColor(colorVal);
    };
    Color.prototype.toVector3 = function () {
        return Vector3_1.Vector3.create(this.r, this.g, this.b);
    };
    Color.prototype.toVector4 = function () {
        return Vector4_1.Vector4.create(this.r, this.g, this.b, this.a);
    };
    Color.prototype.toArray3 = function () {
        return [this.r, this.g, this.b];
    };
    Color.prototype.toString = function () {
        return this._colorString;
    };
    Color.prototype.clone = function () {
        return Color_1.create(this._colorString);
    };
    Color.prototype.isEqual = function (color) {
        return this.r === color.r && this.g === color.g && this.b === color.b && this.a === color.a;
    };
    Color.prototype.setColorByNum = function (colorVal) {
        var color = null;
        this._colorString = colorVal;
        color = REGEX_NUM.exec(colorVal);
        this._setHex(parseInt(color[1], 16));
        return this;
    };
    Color.prototype._setColor = function (colorVal) {
        var color = null;
        if (REGEX_RGBA.test(colorVal)) {
            color = REGEX_RGBA.exec(colorVal);
            this.r = this._getColorValue(color, 1);
            this.g = this._getColorValue(color, 2);
            this.b = this._getColorValue(color, 3);
            this.a = Number(color[4]);
            return this;
        }
        if (REGEX_RGBA_2.test(colorVal)) {
            color = REGEX_RGBA_2.exec(colorVal);
            this.r = parseFloat(color[1]);
            this.g = parseFloat(color[2]);
            this.b = parseFloat(color[3]);
            this.a = Number(color[4]);
            return this;
        }
        if (REGEX_RGB.test(colorVal)) {
            color = REGEX_RGB.exec(colorVal);
            this.r = this._getColorValue(color, 1);
            this.g = this._getColorValue(color, 2);
            this.b = this._getColorValue(color, 3);
            this.a = 1;
            return this;
        }
        if (REGEX_RGB_2.test(colorVal)) {
            color = REGEX_RGB_2.exec(colorVal);
            this.r = parseFloat(color[1]);
            this.g = parseFloat(color[2]);
            this.b = parseFloat(color[3]);
            this.a = 1;
            return this;
        }
        if (REGEX_NUM.test(colorVal)) {
            return this.setColorByNum(colorVal);
        }
    };
    Color.prototype._getColorValue = function (color, index, num) {
        if (num === void 0) { num = 255; }
        return Math.min(num, parseInt(color[index], 10)) / num;
    };
    Color.prototype._setHex = function (hex) {
        hex = Math.floor(hex);
        this.r = (hex >> 16 & 255) / 255;
        this.g = (hex >> 8 & 255) / 255;
        this.b = (hex & 255) / 255;
        this.a = 1;
        return this;
    };
    Color.prototype._clearCache = function () {
        this._colorVec3Cache = null;
        this._colorVec4Cache = null;
        this._colorArr3Cache = null;
    };
    __decorate([
        contract_1.ensureGetter(function (r) {
            contract_1.it("r should >= 0", function () {
                wonder_expect_js_1.expect(r).gte(0);
            });
        })
    ], Color.prototype, "r", null);
    __decorate([
        contract_1.ensureGetter(function (g) {
            contract_1.it("g should >= 0", function () {
                wonder_expect_js_1.expect(g).gte(0);
            });
        })
    ], Color.prototype, "g", null);
    __decorate([
        contract_1.ensureGetter(function (b) {
            contract_1.it("b should >= 0", function () {
                wonder_expect_js_1.expect(b).gte(0);
            });
        })
    ], Color.prototype, "b", null);
    __decorate([
        contract_1.ensureGetter(function (a) {
            contract_1.it("a should >= 0", function () {
                wonder_expect_js_1.expect(a).gte(0);
            });
        })
    ], Color.prototype, "a", null);
    __decorate([
        cache_1.cache(function () {
            return this._colorVec3Cache !== null;
        }, function () {
            return this._colorVec3Cache;
        }, function (result) {
            this._colorVec3Cache = result;
        })
    ], Color.prototype, "toVector3", null);
    __decorate([
        cache_1.cache(function () {
            return this._colorVec4Cache !== null;
        }, function () {
            return this._colorVec4Cache;
        }, function (result) {
            this._colorVec4Cache = result;
        })
    ], Color.prototype, "toVector4", null);
    __decorate([
        cache_1.cache(function () {
            return this._colorArr3Cache !== null;
        }, function () {
            return this._colorArr3Cache;
        }, function (result) {
            this._colorArr3Cache = result;
        })
    ], Color.prototype, "toArray3", null);
    __decorate([
        contract_1.requireCheck(function (colorVal) {
            contract_1.it("color should be #xxxxxx", function () {
                wonder_expect_js_1.expect(REGEX_NUM.test(colorVal)).true;
            });
        })
    ], Color.prototype, "setColorByNum", null);
    Color = Color_1 = __decorate([
        registerClass_1.registerClass("Color")
    ], Color);
    return Color;
    var Color_1;
}());
exports.Color = Color;
//# sourceMappingURL=Color.js.map