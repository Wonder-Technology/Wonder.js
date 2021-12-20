

import * as Angle$WonderCommonlib from "./Angle.bs.js";
import * as Vector3$WonderCommonlib from "./Vector3.bs.js";

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

var setFromMatrix = ((matrixTypeArray) => {
            var m00, m01, m02, m10, m11, m12, m20, m21, m22,
                tr, s, rs, lx, ly, lz, m;
                var x,y,z,w;

            m = matrixTypeArray;

            // Cache matrix values for super-speed
            m00 = m[0];
            m01 = m[1];
            m02 = m[2];
            m10 = m[4];
            m11 = m[5];
            m12 = m[6];
            m20 = m[8];
            m21 = m[9];
            m22 = m[10];

            // Remove the scale from the matrix
            lx = 1 / Math.sqrt(m00 * m00 + m01 * m01 + m02 * m02);
            ly = 1 / Math.sqrt(m10 * m10 + m11 * m11 + m12 * m12);
            lz = 1 / Math.sqrt(m20 * m20 + m21 * m21 + m22 * m22);

            m00 *= lx;
            m01 *= lx;
            m02 *= lx;
            m10 *= ly;
            m11 *= ly;
            m12 *= ly;
            m20 *= lz;
            m21 *= lz;
            m22 *= lz;

            // http://www.cs.ucr.edu/~vbz/resources/quatut.pdf

            tr = m00 + m11 + m22;
            if (tr >= 0) {
                s = Math.sqrt(tr + 1);
                w = s * 0.5;
                s = 0.5 / s;
                x = (m12 - m21) * s;
                y = (m20 - m02) * s;
                z = (m01 - m10) * s;
            } else {
                if (m00 > m11) {
                    if (m00 > m22) {
                        // XDiagDomMatrix
                        rs = (m00 - (m11 + m22)) + 1;
                        rs = Math.sqrt(rs);

                        x = rs * 0.5;
                        rs = 0.5 / rs;
                        w = (m12 - m21) * rs;
                        y = (m01 + m10) * rs;
                        z = (m02 + m20) * rs;
                    } else {
                        // ZDiagDomMatrix
                        rs = (m22 - (m00 + m11)) + 1;
                        rs = Math.sqrt(rs);

                        z = rs * 0.5;
                        rs = 0.5 / rs;
                        w = (m01 - m10) * rs;
                        x = (m20 + m02) * rs;
                        y = (m21 + m12) * rs;
                    }
                } else if (m11 > m22) {
                    // YDiagDomMatrix
                    rs = (m11 - (m22 + m00)) + 1;
                    rs = Math.sqrt(rs);

                    y = rs * 0.5;
                    rs = 0.5 / rs;
                    w = (m20 - m02) * rs;
                    z = (m12 + m21) * rs;
                    x = (m10 + m01) * rs;
                } else {
                    // ZDiagDomMatrix
                    rs = (m22 - (m00 + m11)) + 1;
                    rs = Math.sqrt(rs);

                    z = rs * 0.5;
                    rs = 0.5 / rs;
                    w = (m01 - m10) * rs;
                    x = (m20 + m02) * rs;
                    y = (m21 + m12) * rs;
                }
            }

            return [x,y,z,w]
    });

function setFromEulerAngles(param) {
  var halfToRad = 0.5 * Angle$WonderCommonlib.getDegToRad(undefined);
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

            return [x, y, z];
   });

function getEulerAngles(quat) {
  var rad_to_deg = 180 / Math.PI;
  return Vector3$WonderCommonlib.scale(/* Float */0, _getEulerAngles(quat), rad_to_deg);
}

function setFromAxisAngle(angle, axis) {
  var match = Vector3$WonderCommonlib.normalize(axis);
  var angle$1 = angle * 0.5 * Angle$WonderCommonlib.getDegToRad(undefined);
  var sa = Math.sin(angle$1);
  var ca = Math.cos(angle$1);
  return [
          sa * match[0],
          sa * match[1],
          sa * match[2],
          ca
        ];
}

export {
  conjugate ,
  length ,
  normalize ,
  invert ,
  multiply ,
  setFromMatrix ,
  setFromEulerAngles ,
  _getEulerAngles ,
  getEulerAngles ,
  setFromAxisAngle ,
  
}
/* No side effect */
