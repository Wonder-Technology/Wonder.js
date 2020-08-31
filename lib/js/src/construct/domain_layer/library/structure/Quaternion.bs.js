'use strict';

var Angle$Wonderjs = require("./Angle.bs.js");
var Vector3$Wonderjs = require("./Vector3.bs.js");

function conjugate(param) {
  return [
          param[0] * -1.0,
          param[1] * -1.0,
          param[2] * -1.0,
          param[3]
        ];
}

function length(param) {
  var w = param[3];
  var z = param[2];
  var y = param[1];
  var x = param[0];
  return Math.sqrt(x * x + y * y + z * z + w * w);
}

function normalize(tuple) {
  var len = length(tuple);
  if (len !== 0) {
    return [
            tuple[0] / len,
            tuple[1] / len,
            tuple[2] / len,
            tuple[3] / len
          ];
  } else {
    return [
            0,
            0,
            0,
            1
          ];
  }
}

function invert(tuple) {
  return normalize(conjugate(tuple));
}

function multiply(param, param$1) {
  var q2w = param$1[3];
  var q2z = param$1[2];
  var q2y = param$1[1];
  var q2x = param$1[0];
  var q1w = param[3];
  var q1z = param[2];
  var q1y = param[1];
  var q1x = param[0];
  return [
          q1w * q2x + q1x * q2w + q1y * q2z - q1z * q2y,
          q1w * q2y + q1y * q2w + q1z * q2x - q1x * q2z,
          q1w * q2z + q1z * q2w + q1x * q2y - q1y * q2x,
          q1w * q2w - q1x * q2x - q1y * q2y - q1z * q2z
        ];
}

function setFromEulerAngles(param) {
  var halfToRad = 0.5 * Angle$Wonderjs.getDegToRad(undefined);
  var ex = param[0] * halfToRad;
  var ey = param[1] * halfToRad;
  var ez = param[2] * halfToRad;
  var sx = Math.sin(ex);
  var cx = Math.cos(ex);
  var sy = Math.sin(ey);
  var cy = Math.cos(ey);
  var sz = Math.sin(ez);
  var cz = Math.cos(ez);
  return [
          sx * cy * cz - cx * sy * sz,
          cx * sy * cz + sx * cy * sz,
          cx * cy * sz - sx * sy * cz,
          cx * cy * cz + sx * sy * sz
        ];
}

var _getEulerAngles = (function(quat){
            var x, y, z, qx, qy, qz, qw, a2;

            qx = quat[0];
            qy = quat[1];
            qz = quat[2];
            qw = quat[3];

            a2 = 2 * (qw * qy - qx * qz);
            if (a2 <= -0.99999) {
                x = 2 * Math.atan2(qx, qw);
                y = -Math.PI / 2;
                z = 0;
            } else if (a2 >= 0.99999) {
                x = 2 * Math.atan2(qx, qw);
                y = Math.PI / 2;
                z = 0;
            } else {
                x = Math.atan2(2 * (qw * qx + qy * qz), 1 - 2 * (qx * qx + qy * qy));
                y = Math.asin(a2);
                z = Math.atan2(2 * (qw * qz + qx * qy), 1 - 2 * (qy * qy + qz * qz));
            }

            //return Vector3.create(x, y, z).scale(RAD_TO_DEG);
            return [x, y, z];
   });

function getEulerAngles(quat) {
  var rad_to_deg = 180 / Math.PI;
  return Vector3$Wonderjs.scale(_getEulerAngles(quat), /* Float */0, rad_to_deg);
}

function setFromAxisAngle(angle, axis) {
  var match = Vector3$Wonderjs.normalize(axis);
  var angle$1 = angle * 0.5 * Angle$Wonderjs.getDegToRad(undefined);
  var sa = Math.sin(angle$1);
  var ca = Math.cos(angle$1);
  return [
          sa * match[0],
          sa * match[1],
          sa * match[2],
          ca
        ];
}

exports.conjugate = conjugate;
exports.length = length;
exports.normalize = normalize;
exports.invert = invert;
exports.multiply = multiply;
exports.setFromEulerAngles = setFromEulerAngles;
exports._getEulerAngles = _getEulerAngles;
exports.getEulerAngles = getEulerAngles;
exports.setFromAxisAngle = setFromAxisAngle;
/* No side effect */
