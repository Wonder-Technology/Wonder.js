

import * as Log$WonderCommonlib from "../log/Log.bs.js";
import * as Angle$WonderCommonlib from "./Angle.bs.js";
import * as Vector3$WonderCommonlib from "./Vector3.bs.js";
import * as Contract$WonderCommonlib from "../contract/Contract.bs.js";
import * as Exception$WonderCommonlib from "../structure/Exception.bs.js";

function createIdentityMatrix4(param) {
  return new Float32Array([
              1,
              0,
              0,
              0,
              0,
              1,
              0,
              0,
              0,
              0,
              1,
              0,
              0,
              0,
              0,
              1
            ]);
}

function fromTranslationRotationScale(resultFloat32Arr, param, param$1, param$2) {
  var sz = param$2[2];
  var sy = param$2[1];
  var sx = param$2[0];
  var w = param$1[3];
  var z = param$1[2];
  var y = param$1[1];
  var x = param$1[0];
  var x2 = x + x;
  var y2 = y + y;
  var z2 = z + z;
  var xx = x * x2;
  var xy = x * y2;
  var xz = x * z2;
  var yy = y * y2;
  var yz = y * z2;
  var zz = z * z2;
  var wx = w * x2;
  var wy = w * y2;
  var wz = w * z2;
  resultFloat32Arr[0] = (1 - (yy + zz)) * sx;
  resultFloat32Arr[1] = (xy + wz) * sx;
  resultFloat32Arr[2] = (xz - wy) * sx;
  resultFloat32Arr[3] = 0;
  resultFloat32Arr[4] = (xy - wz) * sy;
  resultFloat32Arr[5] = (1 - (xx + zz)) * sy;
  resultFloat32Arr[6] = (yz + wx) * sy;
  resultFloat32Arr[7] = 0;
  resultFloat32Arr[8] = (xz + wy) * sz;
  resultFloat32Arr[9] = (yz - wx) * sz;
  resultFloat32Arr[10] = (1 - (xx + yy)) * sz;
  resultFloat32Arr[11] = 0;
  resultFloat32Arr[12] = param[0];
  resultFloat32Arr[13] = param[1];
  resultFloat32Arr[14] = param[2];
  resultFloat32Arr[15] = 1;
  return resultFloat32Arr;
}

function multiply(resultFloat32Arr, aMatTypeArr, bMatTypeArr) {
  var a00 = aMatTypeArr[0];
  var a01 = aMatTypeArr[1];
  var a02 = aMatTypeArr[2];
  var a03 = aMatTypeArr[3];
  var a10 = aMatTypeArr[4];
  var a11 = aMatTypeArr[5];
  var a12 = aMatTypeArr[6];
  var a13 = aMatTypeArr[7];
  var a20 = aMatTypeArr[8];
  var a21 = aMatTypeArr[9];
  var a22 = aMatTypeArr[10];
  var a23 = aMatTypeArr[11];
  var a30 = aMatTypeArr[12];
  var a31 = aMatTypeArr[13];
  var a32 = aMatTypeArr[14];
  var a33 = aMatTypeArr[15];
  var b0 = bMatTypeArr[0];
  var b1 = bMatTypeArr[1];
  var b2 = bMatTypeArr[2];
  var b3 = bMatTypeArr[3];
  resultFloat32Arr[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  resultFloat32Arr[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  resultFloat32Arr[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  resultFloat32Arr[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  b0 = bMatTypeArr[4];
  b1 = bMatTypeArr[5];
  b2 = bMatTypeArr[6];
  b3 = bMatTypeArr[7];
  resultFloat32Arr[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  resultFloat32Arr[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  resultFloat32Arr[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  resultFloat32Arr[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  b0 = bMatTypeArr[8];
  b1 = bMatTypeArr[9];
  b2 = bMatTypeArr[10];
  b3 = bMatTypeArr[11];
  resultFloat32Arr[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  resultFloat32Arr[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  resultFloat32Arr[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  resultFloat32Arr[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  b0 = bMatTypeArr[12];
  b1 = bMatTypeArr[13];
  b2 = bMatTypeArr[14];
  b3 = bMatTypeArr[15];
  resultFloat32Arr[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  resultFloat32Arr[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  resultFloat32Arr[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  resultFloat32Arr[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  return resultFloat32Arr;
}

function getTranslationTuple(matTypeArr) {
  return [
          matTypeArr[12],
          matTypeArr[13],
          matTypeArr[14]
        ];
}

function getRotationTuple(matTypeArr) {
  var trace = matTypeArr[0] + matTypeArr[5] + matTypeArr[10];
  if (trace > 0) {
    var s = Math.sqrt(trace + 1.0) * 2;
    return [
            (matTypeArr[6] - matTypeArr[9]) / s,
            (matTypeArr[8] - matTypeArr[2]) / s,
            (matTypeArr[1] - matTypeArr[4]) / s,
            0.25 * s
          ];
  }
  if (matTypeArr[0] > matTypeArr[5] && matTypeArr[0] > matTypeArr[10]) {
    var s$1 = Math.sqrt(1.0 + matTypeArr[0] - matTypeArr[5] - matTypeArr[10]) * 2;
    return [
            0.25 * s$1,
            (matTypeArr[1] + matTypeArr[4]) / s$1,
            (matTypeArr[8] + matTypeArr[2]) / s$1,
            (matTypeArr[6] - matTypeArr[9]) / s$1
          ];
  }
  if (matTypeArr[5] > matTypeArr[10]) {
    var s$2 = Math.sqrt(1.0 + matTypeArr[5] - matTypeArr[0] - matTypeArr[10]) * 2;
    return [
            (matTypeArr[1] + matTypeArr[4]) / s$2,
            0.25 * s$2,
            (matTypeArr[6] + matTypeArr[9]) / s$2,
            (matTypeArr[8] - matTypeArr[2]) / s$2
          ];
  }
  var s$3 = Math.sqrt(1.0 + matTypeArr[10] - matTypeArr[0] - matTypeArr[5]) * 2;
  return [
          (matTypeArr[8] + matTypeArr[2]) / s$3,
          (matTypeArr[6] + matTypeArr[9]) / s$3,
          0.25 * s$3,
          (matTypeArr[1] - matTypeArr[4]) / s$3
        ];
}

function getScaleTuple(matTypeArr) {
  var m11 = matTypeArr[0];
  var m12 = matTypeArr[1];
  var m13 = matTypeArr[2];
  var m21 = matTypeArr[4];
  var m22 = matTypeArr[5];
  var m23 = matTypeArr[6];
  var m31 = matTypeArr[8];
  var m32 = matTypeArr[9];
  var m33 = matTypeArr[10];
  return [
          Math.sqrt(m11 * m11 + m12 * m12 + m13 * m13),
          Math.sqrt(m21 * m21 + m22 * m22 + m23 * m23),
          Math.sqrt(m31 * m31 + m32 * m32 + m33 * m33)
        ];
}

function buildPerspective(resultFloat32Arr, isDebug, param) {
  var far = param[3];
  var near = param[2];
  var fovy = param[0];
  Contract$WonderCommonlib.requireCheck((function (param) {
          return Contract$WonderCommonlib.test(Log$WonderCommonlib.buildAssertMessage("frustum not be null", "be"), (function (param) {
                        var fovy$1 = Math.PI * fovy / 180 / 2;
                        return Contract$WonderCommonlib.Operators.$less$great$eq$dot(Math.sin(fovy$1), 0);
                      }));
        }), isDebug);
  var fovy$1 = Math.PI * fovy / 180 / 2;
  var s = Math.sin(fovy$1);
  var rd = 1 / (far - near);
  var ct = Math.cos(fovy$1) / s;
  resultFloat32Arr[0] = ct / param[1];
  resultFloat32Arr[1] = 0;
  resultFloat32Arr[2] = 0;
  resultFloat32Arr[3] = 0;
  resultFloat32Arr[4] = 0;
  resultFloat32Arr[5] = ct;
  resultFloat32Arr[6] = 0;
  resultFloat32Arr[7] = 0;
  resultFloat32Arr[8] = 0;
  resultFloat32Arr[9] = 0;
  resultFloat32Arr[10] = -(far + near) * rd;
  resultFloat32Arr[11] = -1;
  resultFloat32Arr[12] = 0;
  resultFloat32Arr[13] = 0;
  resultFloat32Arr[14] = -2 * far * near * rd;
  resultFloat32Arr[15] = 0;
  return resultFloat32Arr;
}

function invert(resultFloat32Arr, mat) {
  var a00 = mat[0];
  var a01 = mat[1];
  var a02 = mat[2];
  var a03 = mat[3];
  var a10 = mat[4];
  var a11 = mat[5];
  var a12 = mat[6];
  var a13 = mat[7];
  var a20 = mat[8];
  var a21 = mat[9];
  var a22 = mat[10];
  var a23 = mat[11];
  var a30 = mat[12];
  var a31 = mat[13];
  var a32 = mat[14];
  var a33 = mat[15];
  var b00 = a00 * a11 - a01 * a10;
  var b01 = a00 * a12 - a02 * a10;
  var b02 = a00 * a13 - a03 * a10;
  var b03 = a01 * a12 - a02 * a11;
  var b04 = a01 * a13 - a03 * a11;
  var b05 = a02 * a13 - a03 * a12;
  var b06 = a20 * a31 - a21 * a30;
  var b07 = a20 * a32 - a22 * a30;
  var b08 = a20 * a33 - a23 * a30;
  var b09 = a21 * a32 - a22 * a31;
  var b10 = a21 * a33 - a23 * a31;
  var b11 = a22 * a33 - a23 * a32;
  var det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
  var match = det;
  if (match === 0) {
    return Exception$WonderCommonlib.throwErr(Exception$WonderCommonlib.buildErr(Log$WonderCommonlib.buildFatalMessage("invert", "det shouldn't be 0.", "", "", "")));
  }
  det = 1.0 / det;
  resultFloat32Arr[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
  resultFloat32Arr[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
  resultFloat32Arr[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
  resultFloat32Arr[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
  resultFloat32Arr[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
  resultFloat32Arr[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
  resultFloat32Arr[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
  resultFloat32Arr[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
  resultFloat32Arr[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
  resultFloat32Arr[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
  resultFloat32Arr[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
  resultFloat32Arr[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
  resultFloat32Arr[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
  resultFloat32Arr[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
  resultFloat32Arr[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
  resultFloat32Arr[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;
  return resultFloat32Arr;
}

function invertTo3x3(resultFloat32Arr, mat) {
  var a00 = mat[0];
  var a01 = mat[1];
  var a02 = mat[2];
  var a10 = mat[4];
  var a11 = mat[5];
  var a12 = mat[6];
  var a20 = mat[8];
  var a21 = mat[9];
  var a22 = mat[10];
  var b11 = a22 * a11 - a12 * a21;
  var b21 = -a22 * a01 + a02 * a21;
  var b31 = a12 * a01 - a02 * a11;
  var b12 = -a22 * a10 + a12 * a20;
  var b22 = a22 * a00 - a02 * a20;
  var b32 = -a12 * a00 + a02 * a10;
  var b13 = a21 * a10 - a11 * a20;
  var b23 = -a21 * a00 + a01 * a20;
  var b33 = a11 * a00 - a01 * a10;
  var det = a00 * b11 + a01 * b12 + a02 * b13;
  var match = det;
  if (match === 0) {
    return Exception$WonderCommonlib.throwErr(Exception$WonderCommonlib.buildErr(Log$WonderCommonlib.buildFatalMessage("invert", "det shouldn't be 0.", "", "", "")));
  }
  det = 1.0 / det;
  resultFloat32Arr[0] = b11 * det;
  resultFloat32Arr[1] = b21 * det;
  resultFloat32Arr[2] = b31 * det;
  resultFloat32Arr[3] = b12 * det;
  resultFloat32Arr[4] = b22 * det;
  resultFloat32Arr[5] = b32 * det;
  resultFloat32Arr[6] = b13 * det;
  resultFloat32Arr[7] = b23 * det;
  resultFloat32Arr[8] = b33 * det;
  return resultFloat32Arr;
}

function getEulerAngles(matTypeArr) {
  var match = getScaleTuple(matTypeArr);
  var sy = match[1];
  var sx = match[0];
  var a00 = matTypeArr[0];
  var a01 = matTypeArr[1];
  var a02 = matTypeArr[2];
  var a10 = matTypeArr[4];
  var a11 = matTypeArr[5];
  var a12 = matTypeArr[6];
  var a22 = matTypeArr[10];
  var y = Math.asin(-a02 / sx);
  var halfPi = Math.PI * 0.5;
  var x = 0;
  var z = 0;
  if (y < halfPi) {
    if (y > -halfPi) {
      x = Math.atan2(a12 / sy, a22 / match[2]);
      z = Math.atan2(a01 / sx, a00 / sx);
    } else {
      z = 0;
      x = -Math.atan2(a11 / sy, a10 / sy);
    }
  } else {
    z = 0;
    x = Math.atan2(a11 / sy, a10 / sy);
  }
  return Vector3$WonderCommonlib.scale(/* Float */0, [
              x,
              y,
              z
            ], Angle$WonderCommonlib.getRadToDeg(undefined));
}

function setLookAt(eye, center, up) {
  var z = Vector3$WonderCommonlib.normalize(Vector3$WonderCommonlib.sub(/* Float */0, eye, center));
  var y = Vector3$WonderCommonlib.normalize(up);
  var x = Vector3$WonderCommonlib.normalize(Vector3$WonderCommonlib.cross(y, z));
  var match = Vector3$WonderCommonlib.cross(z, x);
  return new Float32Array([
              x[0],
              x[1],
              x[2],
              0,
              match[0],
              match[1],
              match[2],
              0,
              z[0],
              z[1],
              z[2],
              0,
              eye[0],
              eye[1],
              eye[2],
              1
            ]);
}

export {
  createIdentityMatrix4 ,
  fromTranslationRotationScale ,
  multiply ,
  getTranslationTuple ,
  getRotationTuple ,
  getScaleTuple ,
  buildPerspective ,
  invert ,
  invertTo3x3 ,
  getEulerAngles ,
  setLookAt ,
  
}
/* No side effect */
