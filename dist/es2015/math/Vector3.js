var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { registerClass } from "../definition/typescript/decorator/registerClass";
import { Vector4 } from "./Vector4";
var Vector3 = Vector3_1 = (function () {
    function Vector3() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.values = null;
        this.values = new Float32Array(3);
        if (args.length > 0) {
            this.values[0] = args[0];
            this.values[1] = args[1];
            this.values[2] = args[2];
        }
    }
    Vector3.create = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var m = null;
        if (args.length === 0) {
            m = new this();
        }
        else {
            m = new this(args[0], args[1], args[2]);
        }
        return m;
    };
    Object.defineProperty(Vector3.prototype, "x", {
        get: function () {
            return this.values[0];
        },
        set: function (x) {
            this.values[0] = x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector3.prototype, "y", {
        get: function () {
            return this.values[1];
        },
        set: function (y) {
            this.values[1] = y;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector3.prototype, "z", {
        get: function () {
            return this.values[2];
        },
        set: function (z) {
            this.values[2] = z;
        },
        enumerable: true,
        configurable: true
    });
    Vector3.prototype.normalize = function () {
        var v = this.values;
        var d = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
        if (d === 0) {
            v[0] = 0;
            v[1] = 0;
            v[2] = 0;
            return this;
        }
        v[0] = v[0] / d;
        v[1] = v[1] / d;
        v[2] = v[2] / d;
        if (v[0] === -0) {
            v[0] = 0;
        }
        if (v[1] === -0) {
            v[1] = 0;
        }
        if (v[2] === -0) {
            v[2] = 0;
        }
        return this;
    };
    Vector3.prototype.isZero = function () {
        var v = this.values;
        return v[0] === 0 && v[1] === 0 && v[2] === 0;
    };
    Vector3.prototype.scale = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var v = this.values;
        if (args.length === 1) {
            var scalar = args[0];
            v[0] *= scalar;
            v[1] *= scalar;
            v[2] *= scalar;
        }
        else if (args.length === 3) {
            var x = args[0], y = args[1], z = args[2];
            v[0] *= x;
            v[1] *= y;
            v[2] *= z;
        }
        return this;
    };
    Vector3.prototype.set = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (args.length === 3) {
            this.x = args[0];
            this.y = args[1];
            this.z = args[2];
        }
        else {
            var v = args[0];
            this.x = v.x;
            this.y = v.y;
            this.z = v.z;
        }
    };
    Vector3.prototype.sub = function (v) {
        this.values[0] = this.values[0] - v.values[0];
        this.values[1] = this.values[1] - v.values[1];
        this.values[2] = this.values[2] - v.values[2];
        return this;
    };
    Vector3.prototype.sub2 = function (v1, v2) {
        this.values[0] = v1.values[0] - v2.values[0];
        this.values[1] = v1.values[1] - v2.values[1];
        this.values[2] = v1.values[2] - v2.values[2];
        return this;
    };
    Vector3.prototype.add = function (v) {
        this.values[0] = this.values[0] + v.values[0];
        this.values[1] = this.values[1] + v.values[1];
        this.values[2] = this.values[2] + v.values[2];
        return this;
    };
    Vector3.prototype.add2 = function (v1, v2) {
        this.values[0] = v1.values[0] + v2.values[0];
        this.values[1] = v1.values[1] + v2.values[1];
        this.values[2] = v1.values[2] + v2.values[2];
        return this;
    };
    Vector3.prototype.mul = function (v) {
        this.values[0] = this.values[0] * v.values[0];
        this.values[1] = this.values[1] * v.values[1];
        this.values[2] = this.values[2] * v.values[2];
        return this;
    };
    Vector3.prototype.mul2 = function (v1, v2) {
        this.values[0] = v1.values[0] * v2.values[0];
        this.values[1] = v1.values[1] * v2.values[1];
        this.values[2] = v1.values[2] * v2.values[2];
        return this;
    };
    Vector3.prototype.reverse = function () {
        this.values[0] = -this.values[0];
        this.values[1] = -this.values[1];
        this.values[2] = -this.values[2];
        return this;
    };
    Vector3.prototype.clone = function () {
        var result = Vector3_1.create(), i = 0, len = this.values.length;
        for (i = 0; i < len; i++) {
            result.values[i] = this.values[i];
        }
        return result;
    };
    Vector3.prototype.toVector4 = function () {
        return Vector4.create(this.values[0], this.values[1], this.values[2], 1.0);
    };
    Vector3.prototype.length = function () {
        var v = this.values;
        return Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
    };
    Vector3.prototype.cross = function (lhs, rhs) {
        var a, b, r, ax, ay, az, bx, by, bz;
        a = lhs.values;
        b = rhs.values;
        r = this.values;
        ax = a[0];
        ay = a[1];
        az = a[2];
        bx = b[0];
        by = b[1];
        bz = b[2];
        r[0] = ay * bz - by * az;
        r[1] = az * bx - bz * ax;
        r[2] = ax * by - bx * ay;
        return this;
    };
    Vector3.prototype.lerp = function (lhs, rhs, alpha) {
        var a = lhs.values, b = rhs.values, r = this.values;
        r[0] = a[0] + alpha * (b[0] - a[0]);
        r[1] = a[1] + alpha * (b[1] - a[1]);
        r[2] = a[2] + alpha * (b[2] - a[2]);
        return this;
    };
    Vector3.prototype.dot = function (rhs) {
        var a = this.values, b = rhs.values;
        return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
    };
    Vector3.prototype.calAngleCos = function (v1) {
        var l = this.length() * v1.length();
        if (l === 0) {
            return NaN;
        }
        return this.dot(v1) / l;
    };
    Vector3.prototype.min = function (v) {
        if (this.x > v.x) {
            this.x = v.x;
        }
        if (this.y > v.y) {
            this.y = v.y;
        }
        if (this.z > v.z) {
            this.z = v.z;
        }
        return this;
    };
    Vector3.prototype.max = function (v) {
        if (this.x < v.x) {
            this.x = v.x;
        }
        if (this.y < v.y) {
            this.y = v.y;
        }
        if (this.z < v.z) {
            this.z = v.z;
        }
        return this;
    };
    Vector3.prototype.isEqual = function (v) {
        return this.x === v.x && this.y === v.y && this.z === v.z;
    };
    Vector3.prototype.toArray = function () {
        return [this.x, this.y, this.z];
    };
    Vector3.prototype.applyMatrix3 = function (m) {
        var x = this.x, y = this.y, z = this.z, e = m.values;
        this.x = e[0] * x + e[3] * y + e[6] * z;
        this.y = e[1] * x + e[4] * y + e[7] * z;
        this.z = e[2] * x + e[5] * y + e[8] * z;
        return this;
    };
    Vector3.prototype.applyMatrix4 = function (m) {
        var x = this.x, y = this.y, z = this.z, e = m.values;
        this.x = e[0] * x + e[4] * y + e[8] * z + e[12];
        this.y = e[1] * x + e[5] * y + e[9] * z + e[13];
        this.z = e[2] * x + e[6] * y + e[10] * z + e[14];
        return this;
    };
    Vector3.prototype.distanceTo = function (v) {
        return Math.sqrt(this.distanceToSquared(v));
    };
    Vector3.prototype.distanceToSquared = function (v) {
        var dx = this.x - v.x, dy = this.y - v.y, dz = this.z - v.z;
        return Math.pow(dx, 2) + Math.pow(dy, 2) + Math.pow(dz, 2);
    };
    return Vector3;
}());
Vector3.up = null;
Vector3.forward = null;
Vector3.right = null;
Vector3 = Vector3_1 = __decorate([
    registerClass("Vector3")
], Vector3);
export { Vector3 };
Vector3.up = Vector3.create(0, 1, 0);
Vector3.forward = Vector3.create(0, 0, 1);
Vector3.right = Vector3.create(1, 0, 0);
var Vector3_1;
//# sourceMappingURL=Vector3.js.map