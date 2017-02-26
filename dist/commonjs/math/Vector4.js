"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var registerClass_1 = require("../definition/typescript/decorator/registerClass");
var Vector3_1 = require("./Vector3");
var Vector4 = Vector4_1 = (function () {
    function Vector4() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.values = new Float32Array(4);
        if (args.length > 0) {
            this.values[0] = args[0];
            this.values[1] = args[1];
            this.values[2] = args[2];
            this.values[3] = args[3];
        }
    }
    Vector4.create = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var m = null;
        if (args.length === 0) {
            m = new this();
        }
        else {
            m = new this(args[0], args[1], args[2], args[3]);
        }
        return m;
    };
    Object.defineProperty(Vector4.prototype, "x", {
        get: function () {
            return this.values[0];
        },
        set: function (x) {
            this.values[0] = x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector4.prototype, "y", {
        get: function () {
            return this.values[1];
        },
        set: function (y) {
            this.values[1] = y;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector4.prototype, "z", {
        get: function () {
            return this.values[2];
        },
        set: function (z) {
            this.values[2] = z;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector4.prototype, "w", {
        get: function () {
            return this.values[3];
        },
        set: function (w) {
            this.values[3] = w;
        },
        enumerable: true,
        configurable: true
    });
    Vector4.prototype.normalize = function () {
        var v = this.values;
        var d = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2] + v[3] * v[3]);
        if (d === 0) {
            return Vector4_1.create(0, 0, 0, 0);
        }
        v[0] = v[0] / d;
        v[1] = v[1] / d;
        v[2] = v[2] / d;
        v[3] = v[3] / d;
        return this;
    };
    Vector4.prototype.isEqual = function (v) {
        return this.x === v.x && this.y === v.y && this.z === v.z && this.w === v.w;
    };
    Vector4.prototype.clone = function () {
        return this.copyHelper(Vector4_1.create());
    };
    Vector4.prototype.toVector3 = function () {
        return Vector3_1.Vector3.create(this.values[0], this.values[1], this.values[2]);
    };
    Vector4.prototype.lengthManhattan = function () {
        return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w);
    };
    Vector4.prototype.multiplyScalar = function (scalar) {
        this.x *= scalar;
        this.y *= scalar;
        this.z *= scalar;
        this.w *= scalar;
        return this;
    };
    Vector4.prototype.dot = function (v) {
        return this.x * v.x + this.y * v.y + this.z * v.z + this.w * v.w;
    };
    Vector4.prototype.set = function (x, y, z, w) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    };
    Vector4.prototype.copyHelper = function (vector4) {
        var result = vector4, i = 0, len = this.values.length;
        for (i = 0; i < len; i++) {
            result.values[i] = this.values[i];
        }
        return result;
    };
    return Vector4;
}());
Vector4 = Vector4_1 = __decorate([
    registerClass_1.registerClass("Vector4")
], Vector4);
exports.Vector4 = Vector4;
var Vector4_1;
//# sourceMappingURL=Vector4.js.map