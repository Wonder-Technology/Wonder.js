var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { registerClass } from "../definition/typescript/decorator/registerClass";
import { Matrix3 } from "./Matrix3";
import { Log } from "../utils/Log";
import { requireCheck, it, assert } from "../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { Vector3 } from "./Vector3";
import { Vector4 } from "./Vector4";
import { Quaternion } from "./Quaternion";
import { RAD_TO_DEG } from "./Global";
var Matrix4 = (function () {
    function Matrix4() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.values = null;
        if (args.length === 1) {
            this.values = args[0];
        }
        else {
            this.values = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
        }
    }
    Matrix4_1 = Matrix4;
    Matrix4.create = function () {
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
    Matrix4.prototype.set = function (initialM11, initialM12, initialM13, initialM14, initialM21, initialM22, initialM23, initialM24, initialM31, initialM32, initialM33, initialM34, initialM41, initialM42, initialM43, initialM44) {
        var te = this.values;
        te[0] = initialM11;
        te[1] = initialM12;
        te[2] = initialM13;
        te[3] = initialM14;
        te[4] = initialM21;
        te[5] = initialM22;
        te[6] = initialM23;
        te[7] = initialM24;
        te[8] = initialM31;
        te[9] = initialM32;
        te[10] = initialM33;
        te[11] = initialM34;
        te[12] = initialM41;
        te[13] = initialM42;
        te[14] = initialM43;
        te[15] = initialM44;
        return this;
    };
    Matrix4.prototype.setIdentity = function () {
        var e = this.values;
        e[0] = 1;
        e[4] = 0;
        e[8] = 0;
        e[12] = 0;
        e[1] = 0;
        e[5] = 1;
        e[9] = 0;
        e[13] = 0;
        e[2] = 0;
        e[6] = 0;
        e[10] = 1;
        e[14] = 0;
        e[3] = 0;
        e[7] = 0;
        e[11] = 0;
        e[15] = 1;
        return this;
    };
    Matrix4.prototype.invert = function () {
        var a00, a01, a02, a03, a10, a11, a12, a13, a20, a21, a22, a23, a30, a31, a32, a33, b00, b01, b02, b03, b04, b05, b06, b07, b08, b09, b10, b11, invDet, m;
        m = this.values;
        a00 = m[0];
        a01 = m[1];
        a02 = m[2];
        a03 = m[3];
        a10 = m[4];
        a11 = m[5];
        a12 = m[6];
        a13 = m[7];
        a20 = m[8];
        a21 = m[9];
        a22 = m[10];
        a23 = m[11];
        a30 = m[12];
        a31 = m[13];
        a32 = m[14];
        a33 = m[15];
        b00 = a00 * a11 - a01 * a10;
        b01 = a00 * a12 - a02 * a10;
        b02 = a00 * a13 - a03 * a10;
        b03 = a01 * a12 - a02 * a11;
        b04 = a01 * a13 - a03 * a11;
        b05 = a02 * a13 - a03 * a12;
        b06 = a20 * a31 - a21 * a30;
        b07 = a20 * a32 - a22 * a30;
        b08 = a20 * a33 - a23 * a30;
        b09 = a21 * a32 - a22 * a31;
        b10 = a21 * a33 - a23 * a31;
        b11 = a22 * a33 - a23 * a32;
        invDet = 1 / (b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06);
        m[0] = (a11 * b11 - a12 * b10 + a13 * b09) * invDet;
        m[1] = (-a01 * b11 + a02 * b10 - a03 * b09) * invDet;
        m[2] = (a31 * b05 - a32 * b04 + a33 * b03) * invDet;
        m[3] = (-a21 * b05 + a22 * b04 - a23 * b03) * invDet;
        m[4] = (-a10 * b11 + a12 * b08 - a13 * b07) * invDet;
        m[5] = (a00 * b11 - a02 * b08 + a03 * b07) * invDet;
        m[6] = (-a30 * b05 + a32 * b02 - a33 * b01) * invDet;
        m[7] = (a20 * b05 - a22 * b02 + a23 * b01) * invDet;
        m[8] = (a10 * b10 - a11 * b08 + a13 * b06) * invDet;
        m[9] = (-a00 * b10 + a01 * b08 - a03 * b06) * invDet;
        m[10] = (a30 * b04 - a31 * b02 + a33 * b00) * invDet;
        m[11] = (-a20 * b04 + a21 * b02 - a23 * b00) * invDet;
        m[12] = (-a10 * b09 + a11 * b07 - a12 * b06) * invDet;
        m[13] = (a00 * b09 - a01 * b07 + a02 * b06) * invDet;
        m[14] = (-a30 * b03 + a31 * b01 - a32 * b00) * invDet;
        m[15] = (a20 * b03 - a21 * b01 + a22 * b00) * invDet;
        return this;
    };
    Matrix4.prototype.invertTo3x3 = function () {
        var a11, a21, a31, a12, a22, a32, a13, a23, a33, m, r, det, idet;
        var mat3 = Matrix3.create();
        m = this.values;
        r = mat3.values;
        a11 = m[10] * m[5] - m[6] * m[9];
        a21 = -m[10] * m[1] + m[2] * m[9];
        a31 = m[6] * m[1] - m[2] * m[5];
        a12 = -m[10] * m[4] + m[6] * m[8];
        a22 = m[10] * m[0] - m[2] * m[8];
        a32 = -m[6] * m[0] + m[2] * m[4];
        a13 = m[9] * m[4] - m[5] * m[8];
        a23 = -m[9] * m[0] + m[1] * m[8];
        a33 = m[5] * m[0] - m[1] * m[4];
        det = m[0] * a11 + m[1] * a12 + m[2] * a13;
        if (det === 0) {
            Log.warn("can't invert matrix, determinant is 0");
            return mat3;
        }
        idet = 1 / det;
        r[0] = idet * a11;
        r[1] = idet * a21;
        r[2] = idet * a31;
        r[3] = idet * a12;
        r[4] = idet * a22;
        r[5] = idet * a32;
        r[6] = idet * a13;
        r[7] = idet * a23;
        r[8] = idet * a33;
        return mat3;
    };
    Matrix4.prototype.transpose = function () {
        var te = this.values;
        var tmp;
        tmp = te[1];
        te[1] = te[4];
        te[4] = tmp;
        tmp = te[2];
        te[2] = te[8];
        te[8] = tmp;
        tmp = te[6];
        te[6] = te[9];
        te[9] = tmp;
        tmp = te[3];
        te[3] = te[12];
        te[12] = tmp;
        tmp = te[7];
        te[7] = te[13];
        te[13] = tmp;
        tmp = te[11];
        te[11] = te[14];
        te[14] = tmp;
        return this;
    };
    Matrix4.prototype.setTranslate = function (x, y, z) {
        var e = this.values;
        e[0] = 1;
        e[4] = 0;
        e[8] = 0;
        e[12] = x;
        e[1] = 0;
        e[5] = 1;
        e[9] = 0;
        e[13] = y;
        e[2] = 0;
        e[6] = 0;
        e[10] = 1;
        e[14] = z;
        e[3] = 0;
        e[7] = 0;
        e[11] = 0;
        e[15] = 1;
        return this;
    };
    Matrix4.prototype.translate = function (x, y, z) {
        this.applyMatrix(Matrix4_1.create().setTranslate(x, y, z));
        return this;
    };
    Matrix4.prototype.setRotate = function (angle, x, y, z) {
        var e, s, c, len, rlen, nc, xy, yz, zx, xs, ys, zs;
        var angle = Math.PI * angle / 180;
        e = this.values;
        s = Math.sin(angle);
        c = Math.cos(angle);
        if (0 !== x && 0 === y && 0 === z) {
            if (x < 0) {
                s = -s;
            }
            e[0] = 1;
            e[4] = 0;
            e[8] = 0;
            e[12] = 0;
            e[1] = 0;
            e[5] = c;
            e[9] = -s;
            e[13] = 0;
            e[2] = 0;
            e[6] = s;
            e[10] = c;
            e[14] = 0;
            e[3] = 0;
            e[7] = 0;
            e[11] = 0;
            e[15] = 1;
        }
        else if (0 === x && 0 !== y && 0 === z) {
            if (y < 0) {
                s = -s;
            }
            e[0] = c;
            e[4] = 0;
            e[8] = s;
            e[12] = 0;
            e[1] = 0;
            e[5] = 1;
            e[9] = 0;
            e[13] = 0;
            e[2] = -s;
            e[6] = 0;
            e[10] = c;
            e[14] = 0;
            e[3] = 0;
            e[7] = 0;
            e[11] = 0;
            e[15] = 1;
        }
        else if (0 === x && 0 === y && 0 !== z) {
            if (z < 0) {
                s = -s;
            }
            e[0] = c;
            e[4] = -s;
            e[8] = 0;
            e[12] = 0;
            e[1] = s;
            e[5] = c;
            e[9] = 0;
            e[13] = 0;
            e[2] = 0;
            e[6] = 0;
            e[10] = 1;
            e[14] = 0;
            e[3] = 0;
            e[7] = 0;
            e[11] = 0;
            e[15] = 1;
        }
        else {
            len = Math.sqrt(x * x + y * y + z * z);
            if (len !== 1) {
                rlen = 1 / len;
                x *= rlen;
                y *= rlen;
                z *= rlen;
            }
            nc = 1 - c;
            xy = x * y;
            yz = y * z;
            zx = z * x;
            xs = x * s;
            ys = y * s;
            zs = z * s;
            e[0] = x * x * nc + c;
            e[1] = xy * nc + zs;
            e[2] = zx * nc - ys;
            e[3] = 0;
            e[4] = xy * nc - zs;
            e[5] = y * y * nc + c;
            e[6] = yz * nc + xs;
            e[7] = 0;
            e[8] = zx * nc + ys;
            e[9] = yz * nc - xs;
            e[10] = z * z * nc + c;
            e[11] = 0;
            e[12] = 0;
            e[13] = 0;
            e[14] = 0;
            e[15] = 1;
        }
        return this;
    };
    Matrix4.prototype.rotate = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var angle = args[0];
        if (args.length === 2) {
            var vector3 = args[1];
            this.applyMatrix(Matrix4_1.create().setRotate(angle, vector3.values[0], vector3.values[1], vector3.values[2]));
        }
        else if (args.length === 4) {
            var x = args[1], y = args[2], z = args[3];
            this.applyMatrix(Matrix4_1.create().setRotate(angle, x, y, z));
        }
        return this;
    };
    Matrix4.prototype.setScale = function (x, y, z) {
        var e = this.values;
        e[0] = x;
        e[4] = 0;
        e[8] = 0;
        e[12] = 0;
        e[1] = 0;
        e[5] = y;
        e[9] = 0;
        e[13] = 0;
        e[2] = 0;
        e[6] = 0;
        e[10] = z;
        e[14] = 0;
        e[3] = 0;
        e[7] = 0;
        e[11] = 0;
        e[15] = 1;
        return this;
    };
    Matrix4.prototype.scale = function (x, y, z) {
        this.applyMatrix(Matrix4_1.create().setScale(x, y, z));
        return this;
    };
    Matrix4.prototype.setLookAt = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var x, y, z, eye, center, up;
        if (args.length === 3) {
            eye = args[0];
            center = args[1];
            up = args[2];
        }
        else if (args.length === 9) {
            eye = Vector3.create(args[0], args[1], args[2]);
            center = Vector3.create(args[3], args[4], args[5]);
            up = Vector3.create(args[6], args[7], args[8]);
        }
        x = Vector3.create();
        z = eye.clone().sub(center).normalize();
        y = up.clone().normalize();
        x.cross(y, z).normalize();
        y.cross(z, x);
        var r = this.values;
        r[0] = x.x;
        r[1] = x.y;
        r[2] = x.z;
        r[3] = 0;
        r[4] = y.x;
        r[5] = y.y;
        r[6] = y.z;
        r[7] = 0;
        r[8] = z.x;
        r[9] = z.y;
        r[10] = z.z;
        r[11] = 0;
        r[12] = eye.x;
        r[13] = eye.y;
        r[14] = eye.z;
        r[15] = 1;
        return this;
    };
    Matrix4.prototype.lookAt = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var matrix = Matrix4_1.create();
        this.applyMatrix(matrix.setLookAt.apply(matrix, args));
        return this;
    };
    Matrix4.prototype.setOrtho = function (left, right, bottom, top, near, far) {
        var e = this.values, rw, rh, rd;
        rw = 1 / (right - left);
        rh = 1 / (top - bottom);
        rd = 1 / (far - near);
        e[0] = 2 * rw;
        e[1] = 0;
        e[2] = 0;
        e[3] = 0;
        e[4] = 0;
        e[5] = 2 * rh;
        e[6] = 0;
        e[7] = 0;
        e[8] = 0;
        e[9] = 0;
        e[10] = -2 * rd;
        e[11] = 0;
        e[12] = -(right + left) * rw;
        e[13] = -(top + bottom) * rh;
        e[14] = -(far + near) * rd;
        e[15] = 1;
        return this;
    };
    Matrix4.prototype.ortho = function (left, right, bottom, top, near, far) {
        this.applyMatrix(Matrix4_1.create().setOrtho(left, right, bottom, top, near, far));
        return this;
    };
    Matrix4.prototype.setPerspective = function (fovy, aspect, near, far) {
        var e = null, rd = null, s = null, ct = null, fovy = Math.PI * fovy / 180 / 2;
        s = Math.sin(fovy);
        Log.error(s === 0, Log.info.FUNC_MUST_NOT_BE("frustum", "null"));
        rd = 1 / (far - near);
        ct = Math.cos(fovy) / s;
        e = this.values;
        e[0] = ct / aspect;
        e[1] = 0;
        e[2] = 0;
        e[3] = 0;
        e[4] = 0;
        e[5] = ct;
        e[6] = 0;
        e[7] = 0;
        e[8] = 0;
        e[9] = 0;
        e[10] = -(far + near) * rd;
        e[11] = -1;
        e[12] = 0;
        e[13] = 0;
        e[14] = -2 * near * far * rd;
        e[15] = 0;
        return this;
    };
    Matrix4.prototype.perspective = function (fovy, aspect, near, far) {
        this.applyMatrix(Matrix4_1.create().setPerspective(fovy, aspect, near, far));
        return this;
    };
    Matrix4.prototype.applyMatrix = function (other, notChangeSelf) {
        if (notChangeSelf === void 0) { notChangeSelf = false; }
        var a = this, b = other.clone();
        if (notChangeSelf) {
            return b.multiply(a);
        }
        this.values = b.multiply(a).values;
        return this;
    };
    Matrix4.prototype.multiply = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var mat1 = null, mat2 = null, result = null;
        result = this.values;
        if (args.length === 1) {
            mat1 = this.values;
            mat2 = args[0].values;
        }
        else if (args.length === 2) {
            mat1 = args[0].values;
            mat2 = args[1].values;
        }
        var a = mat1[0], b = mat1[1], c = mat1[2], d = mat1[3], e = mat1[4], f = mat1[5], g = mat1[6], h = mat1[7], i = mat1[8], j = mat1[9], k = mat1[10], l = mat1[11], m = mat1[12], n = mat1[13], o = mat1[14], p = mat1[15], A = mat2[0], B = mat2[1], C = mat2[2], D = mat2[3], E = mat2[4], F = mat2[5], G = mat2[6], H = mat2[7], I = mat2[8], J = mat2[9], K = mat2[10], L = mat2[11], M = mat2[12], N = mat2[13], O = mat2[14], P = mat2[15];
        result[0] = A * a + B * e + C * i + D * m;
        result[1] = A * b + B * f + C * j + D * n;
        result[2] = A * c + B * g + C * k + D * o;
        result[3] = A * d + B * h + C * l + D * p;
        result[4] = E * a + F * e + G * i + H * m;
        result[5] = E * b + F * f + G * j + H * n;
        result[6] = E * c + F * g + G * k + H * o;
        result[7] = E * d + F * h + G * l + H * p;
        result[8] = I * a + J * e + K * i + L * m;
        result[9] = I * b + J * f + K * j + L * n;
        result[10] = I * c + J * g + K * k + L * o;
        result[11] = I * d + J * h + K * l + L * p;
        result[12] = M * a + N * e + O * i + P * m;
        result[13] = M * b + N * f + O * j + P * n;
        result[14] = M * c + N * g + O * k + P * o;
        result[15] = M * d + N * h + O * l + P * p;
        return this;
    };
    Matrix4.prototype.multiplyVector4 = function (vector) {
        var mat1 = this.values, vec4 = vector.values;
        var result = [];
        result[0] = vec4[0] * mat1[0] + vec4[1] * mat1[4] + vec4[2] * mat1[8] + vec4[3] * mat1[12];
        result[1] = vec4[0] * mat1[1] + vec4[1] * mat1[5] + vec4[2] * mat1[9] + vec4[3] * mat1[13];
        result[2] = vec4[0] * mat1[2] + vec4[1] * mat1[6] + vec4[2] * mat1[10] + vec4[3] * mat1[14];
        result[3] = vec4[0] * mat1[3] + vec4[1] * mat1[7] + vec4[2] * mat1[11] + vec4[3] * mat1[15];
        return Vector4.create(result[0], result[1], result[2], result[3]);
    };
    Matrix4.prototype.multiplyVector3 = function (vector) {
        var mat1 = this.values, vec3 = vector.values;
        var result = [];
        result[0] = vec3[0] * mat1[0] + vec3[1] * mat1[4] + vec3[2] * mat1[8];
        result[1] = vec3[0] * mat1[1] + vec3[1] * mat1[5] + vec3[2] * mat1[9];
        result[2] = vec3[0] * mat1[2] + vec3[1] * mat1[6] + vec3[2] * mat1[10];
        return Vector3.create(result[0], result[1], result[2]);
    };
    Matrix4.prototype.multiplyPoint = function (vector) {
        var mat1 = this.values, vec3 = vector.values;
        var result = [];
        result[0] = vec3[0] * mat1[0] + vec3[1] * mat1[4] + vec3[2] * mat1[8] + mat1[12];
        result[1] = vec3[0] * mat1[1] + vec3[1] * mat1[5] + vec3[2] * mat1[9] + mat1[13];
        result[2] = vec3[0] * mat1[2] + vec3[1] * mat1[6] + vec3[2] * mat1[10] + mat1[14];
        return Vector3.create(result[0], result[1], result[2]);
    };
    Matrix4.prototype.clone = function () {
        var result = Matrix4_1.create(), i = 0, len = this.values.length;
        for (i = 0; i < len; i++) {
            result.values[i] = this.values[i];
        }
        return result;
    };
    Matrix4.prototype.cloneToArray = function (array, offset) {
        if (offset === void 0) { offset = 0; }
        var values = this.values;
        for (var index = 0; index < 16; index++) {
            array[offset + index] = values[index];
        }
        return this;
    };
    Matrix4.prototype.getX = function () {
        return Vector3.create(this.values[0], this.values[1], this.values[2]);
    };
    Matrix4.prototype.getY = function () {
        return Vector3.create(this.values[4], this.values[5], this.values[6]);
    };
    Matrix4.prototype.getZ = function () {
        return Vector3.create(this.values[8], this.values[9], this.values[10]);
    };
    Matrix4.prototype.getTranslation = function () {
        return Vector3.create(this.values[12], this.values[13], this.values[14]);
    };
    Matrix4.prototype.getScale = function () {
        return Vector3.create(this.getX().length(), this.getY().length(), this.getZ().length());
    };
    Matrix4.prototype.getRotation = function () {
        return Quaternion.create().setFromMatrix(this);
    };
    Matrix4.prototype.getEulerAngles = function () {
        var x, y, z, sx, sy, sz, m, halfPi;
        var scale = this.getScale();
        sx = scale.x;
        sy = scale.y;
        sz = scale.z;
        m = this.values;
        y = Math.asin(-m[2] / sx);
        halfPi = Math.PI * 0.5;
        if (y < halfPi) {
            if (y > -halfPi) {
                x = Math.atan2(m[6] / sy, m[10] / sz);
                z = Math.atan2(m[1] / sx, m[0] / sx);
            }
            else {
                z = 0;
                x = -Math.atan2(m[4] / sy, m[5] / sy);
            }
        }
        else {
            z = 0;
            x = Math.atan2(m[4] / sy, m[5] / sy);
        }
        return Vector3.create(x, y, z).scale(RAD_TO_DEG);
    };
    Matrix4.prototype.setTRS = function (t, r, s) {
        var tx, ty, tz, qx, qy, qz, qw, sx, sy, sz, x2, y2, z2, xx, xy, xz, yy, yz, zz, wx, wy, wz, m;
        tx = t.x;
        ty = t.y;
        tz = t.z;
        qx = r.x;
        qy = r.y;
        qz = r.z;
        qw = r.w;
        sx = s.x;
        sy = s.y;
        sz = s.z;
        x2 = qx + qx;
        y2 = qy + qy;
        z2 = qz + qz;
        xx = qx * x2;
        xy = qx * y2;
        xz = qx * z2;
        yy = qy * y2;
        yz = qy * z2;
        zz = qz * z2;
        wx = qw * x2;
        wy = qw * y2;
        wz = qw * z2;
        m = this.values;
        m[0] = (1 - (yy + zz)) * sx;
        m[1] = (xy + wz) * sx;
        m[2] = (xz - wy) * sx;
        m[3] = 0;
        m[4] = (xy - wz) * sy;
        m[5] = (1 - (xx + zz)) * sy;
        m[6] = (yz + wx) * sy;
        m[7] = 0;
        m[8] = (xz + wy) * sz;
        m[9] = (yz - wx) * sz;
        m[10] = (1 - (xx + yy)) * sz;
        m[11] = 0;
        m[12] = tx;
        m[13] = ty;
        m[14] = tz;
        m[15] = 1;
        return this;
    };
    __decorate([
        requireCheck(function (angle, x, y, z) {
            it("axis's component shouldn't all be zero", function () {
                expect(x === 0 && y === 0 && z === 0).false;
            });
        })
    ], Matrix4.prototype, "setRotate", null);
    __decorate([
        requireCheck(function (left, right, bottom, top, near, far) {
            assert(left !== right && bottom !== top && near !== far, Log.info.FUNC_MUST_NOT_BE("frustum", "null"));
        })
    ], Matrix4.prototype, "setOrtho", null);
    __decorate([
        requireCheck(function (fovy, aspect, near, far) {
            assert(near !== far && aspect !== 0, Log.info.FUNC_MUST_NOT_BE("frustum", "null"));
            assert(near > 0, Log.info.FUNC_MUST("near", "> 0"));
            assert(far > 0, Log.info.FUNC_MUST("far", "> 0"));
        })
    ], Matrix4.prototype, "setPerspective", null);
    Matrix4 = Matrix4_1 = __decorate([
        registerClass("Matrix4")
    ], Matrix4);
    return Matrix4;
    var Matrix4_1;
}());
export { Matrix4 };
//# sourceMappingURL=Matrix4.js.map