"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var registerClass_1 = require("../definition/typescript/decorator/registerClass");
var Vector2_1 = require("./Vector2");
var Global_1 = require("./Global");
var Matrix3 = (function () {
    function Matrix3() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.values = null;
        if (args.length === 1) {
            this.values = args[0];
        }
        else {
            this.values = new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 1]);
        }
    }
    Matrix3_1 = Matrix3;
    Matrix3.create = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var m = null;
        if (args.length === 0) {
            m = new this();
        }
        else {
            m = new this(args[0]);
        }
        return m;
    };
    Object.defineProperty(Matrix3.prototype, "a", {
        get: function () {
            return this.values[0];
        },
        set: function (a) {
            this.values[0] = a;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Matrix3.prototype, "c", {
        get: function () {
            return this.values[1];
        },
        set: function (c) {
            this.values[1] = c;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Matrix3.prototype, "b", {
        get: function () {
            return this.values[3];
        },
        set: function (b) {
            this.values[3] = b;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Matrix3.prototype, "d", {
        get: function () {
            return this.values[4];
        },
        set: function (d) {
            this.values[4] = d;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Matrix3.prototype, "tx", {
        get: function () {
            return this.values[6];
        },
        set: function (tx) {
            this.values[6] = tx;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Matrix3.prototype, "ty", {
        get: function () {
            return this.values[7];
        },
        set: function (ty) {
            this.values[7] = ty;
        },
        enumerable: true,
        configurable: true
    });
    Matrix3.prototype.setIdentity = function () {
        var e = this.values;
        e[0] = 1;
        e[3] = 0;
        e[6] = 0;
        e[1] = 0;
        e[4] = 1;
        e[7] = 0;
        e[2] = 0;
        e[5] = 0;
        e[8] = 1;
        return this;
    };
    Matrix3.prototype.invert = function () {
        var a1 = this.values[0];
        var b1 = this.values[1];
        var c1 = this.values[3];
        var d1 = this.values[4];
        var tx1 = this.values[6];
        var ty1 = this.values[7];
        var n = a1 * d1 - b1 * c1;
        this.values[0] = d1 / n;
        this.values[1] = -b1 / n;
        this.values[3] = -c1 / n;
        this.values[4] = a1 / n;
        this.values[6] = (c1 * ty1 - d1 * tx1) / n;
        this.values[7] = -(a1 * ty1 - b1 * tx1) / n;
        return this;
    };
    Matrix3.prototype.multiplyScalar = function (s) {
        var te = this.values;
        te[0] *= s;
        te[3] *= s;
        te[6] *= s;
        te[1] *= s;
        te[4] *= s;
        te[7] *= s;
        te[2] *= s;
        te[5] *= s;
        te[8] *= s;
        return this;
    };
    Matrix3.prototype.multiplyVector2 = function (vector) {
        var x = vector.x, y = vector.y, result = Vector2_1.Vector2.create(), e = this.values;
        result.x = e[0] * x + e[3] * y;
        result.y = e[1] * x + e[4] * y;
        return result;
    };
    Matrix3.prototype.multiplyPoint = function (vector) {
        var x = vector.x, y = vector.y, result = Vector2_1.Vector2.create(), e = this.values;
        result.x = e[0] * x + e[3] * y + this.tx;
        result.y = e[1] * x + e[4] * y + this.ty;
        return result;
    };
    Matrix3.prototype.multiply = function (matrix) {
        var m11 = this.a * matrix.a + this.c * matrix.b;
        var m12 = this.b * matrix.a + this.d * matrix.b;
        var m21 = this.a * matrix.c + this.c * matrix.d;
        var m22 = this.b * matrix.c + this.d * matrix.d;
        var dx = this.a * matrix.tx + this.c * matrix.ty + this.tx;
        var dy = this.b * matrix.tx + this.d * matrix.ty + this.ty;
        this.a = m11;
        this.b = m12;
        this.c = m21;
        this.d = m22;
        this.tx = dx;
        this.ty = dy;
        return this;
    };
    Matrix3.prototype.transpose = function () {
        var tmp, m = this.values;
        tmp = m[1];
        m[1] = m[3];
        m[3] = tmp;
        tmp = m[2];
        m[2] = m[6];
        m[6] = tmp;
        tmp = m[5];
        m[5] = m[7];
        m[7] = tmp;
        return this;
    };
    Matrix3.prototype.clone = function () {
        return Matrix3_1.create().set(this);
    };
    Matrix3.prototype.cloneToArray = function (array, offset) {
        if (offset === void 0) { offset = 0; }
        var values = this.values;
        for (var index = 0; index < 9; index++) {
            array[offset + index] = values[index];
        }
        return this;
    };
    Matrix3.prototype.set = function (matrix) {
        var te = this.values, values = matrix.values;
        te[0] = values[0];
        te[3] = values[3];
        te[6] = values[6];
        te[1] = values[1];
        te[4] = values[4];
        te[7] = values[7];
        te[2] = values[2];
        te[5] = values[5];
        te[8] = values[8];
        return this;
    };
    Matrix3.prototype.setTS = function (t, s) {
        this.setPosition(t.x, t.y);
        this.setScale(s.x, s.y);
    };
    Matrix3.prototype.rotate = function (angle) {
        var rad = angle * Global_1.DEG_TO_RAD;
        var c = Math.cos(rad);
        var s = Math.sin(rad);
        var m11 = this.a * c + this.c * s;
        var m12 = this.b * c + this.d * s;
        var m21 = this.a * -s + this.c * c;
        var m22 = this.b * -s + this.d * c;
        this.a = m11;
        this.b = m12;
        this.c = m21;
        this.d = m22;
        return this;
    };
    Matrix3.prototype.setRotation = function (angle) {
        var rad = angle * Global_1.DEG_TO_RAD;
        var cos_a = Math.cos(rad);
        var sin_a = Math.sin(rad);
        var values = this.values;
        values[0] = cos_a;
        values[1] = -sin_a;
        values[3] = sin_a;
        values[4] = cos_a;
        return this;
    };
    Matrix3.prototype.translate = function (x, y) {
        this.tx += this.a * x + this.c * y;
        this.ty += this.b * x + this.d * y;
    };
    Matrix3.prototype.setPosition = function (x, y) {
        this.tx = x;
        this.ty = y;
    };
    Matrix3.prototype.scale = function (x, y) {
        this.a *= x;
        this.b *= x;
        this.c *= y;
        this.d *= y;
        return this;
    };
    Matrix3.prototype.setScale = function (x, y) {
        var values = this.values;
        values[0] = x;
        values[4] = y;
        return this;
    };
    Matrix3.prototype.getTranslation = function () {
        return Vector2_1.Vector2.create(this.tx, this.ty);
    };
    Matrix3.prototype.getScale = function () {
        return Vector2_1.Vector2.create(Math.sqrt(this.a * this.a + this.b * this.b), Math.sqrt(this.c * this.c + this.d * this.d));
    };
    Matrix3.prototype.getRotation = function () {
        return this._getSkewX();
    };
    Matrix3.prototype.getSkew = function () {
        return Vector2_1.Vector2.create(this._getSkewX(), this._getSkewY());
    };
    Matrix3.prototype._getDeltaTransformPoint = function (matrix, point) {
        return {
            x: point.x * matrix.a + point.y * matrix.c + 0,
            y: point.x * matrix.b + point.y * matrix.d + 0
        };
    };
    Matrix3.prototype._getSkewX = function () {
        var px = this._getDeltaTransformPoint(this, { x: 0, y: 1 });
        return ((180 / Math.PI) * Math.atan2(px.y, px.x) - 90);
    };
    Matrix3.prototype._getSkewY = function () {
        var py = this._getDeltaTransformPoint(this, { x: 1, y: 0 });
        return ((180 / Math.PI) * Math.atan2(py.y, py.x));
    };
    Matrix3 = Matrix3_1 = __decorate([
        registerClass_1.registerClass("Matrix3")
    ], Matrix3);
    return Matrix3;
    var Matrix3_1;
}());
exports.Matrix3 = Matrix3;
//# sourceMappingURL=Matrix3.js.map