

import * as RayUtils$Wonderjs from "./RayUtils.js";
import * as Caml_builtin_exceptions from "../../../../node_modules/bs-platform/lib/es6/caml_builtin_exceptions.js";
import * as Matrix4Service$Wonderjs from "../service/atom/Matrix4Service.js";
import * as Vector3Service$Wonderjs from "../service/atom/Vector3Service.js";
import * as Vector3_JieHuo_Service$Wonderjs from "./Vector3_JieHuo_Service.js";

function _at(t, param) {
  var __x = Vector3_JieHuo_Service$Wonderjs.multiplyScalar(param[/* direction */1], t);
  return Vector3Service$Wonderjs.add(/* Float */0, __x, param[/* origin */0]);
}

function isIntersectAABB(param, ray) {
  var max = param[/* max */1];
  var maxZ = max[2];
  var maxY = max[1];
  var maxX = max[0];
  var min = param[/* min */0];
  var minZ = min[2];
  var minY = min[1];
  var minX = min[0];
  var direction = ray[/* direction */1];
  var origin = ray[/* origin */0];
  var originZ = origin[2];
  var originY = origin[1];
  var originX = origin[0];
  var invdirx = 1 / direction[0];
  var invdiry = 1 / direction[1];
  var invdirz = 1 / direction[2];
  var match = invdirx >= 0 ? /* tuple */[
      (minX - originX) * invdirx,
      (maxX - originX) * invdirx
    ] : /* tuple */[
      (maxX - originX) * invdirx,
      (minX - originX) * invdirx
    ];
  var tmax = match[1];
  var tmin = match[0];
  var match$1 = invdiry >= 0 ? /* tuple */[
      (minY - originY) * invdiry,
      (maxY - originY) * invdiry
    ] : /* tuple */[
      (maxY - originY) * invdiry,
      (minY - originY) * invdiry
    ];
  var tymax = match$1[1];
  var tymin = match$1[0];
  if (tmin > tymax || tymin > tmax) {
    return false;
  } else {
    var match$2 = tymin > tmin || tmin !== tmin;
    var tmin$1 = match$2 ? tymin : tmin;
    var match$3 = tymax < tmax || tmax !== tmax;
    var tmax$1 = match$3 ? tymax : tmax;
    var match$4 = invdirz >= 0 ? /* tuple */[
        (minZ - originZ) * invdirz,
        (maxZ - originZ) * invdirz
      ] : /* tuple */[
        (maxZ - originZ) * invdirz,
        (minZ - originZ) * invdirz
      ];
    var tzmax = match$4[1];
    if (tmin$1 > tzmax || match$4[0] > tmax$1) {
      return false;
    } else {
      var match$5 = tzmax < tmax$1 || tmax$1 !== tmax$1;
      var tmax$2 = match$5 ? tzmax : tmax$1;
      return tmax$2 >= 0;
    }
  }
}

function isIntersectOBB(aabb, localToWorldMatrix, ray) {
  var inverseMatrix = Matrix4Service$Wonderjs.invert(localToWorldMatrix, Matrix4Service$Wonderjs.createIdentityMatrix4(/* () */0));
  var ray$1 = RayUtils$Wonderjs.applyMatrix4(ray, inverseMatrix);
  return isIntersectAABB(aabb, ray$1);
}

function isIntersectSphere(param, ray) {
  var radius = param[/* radius */0];
  var v1 = Vector3Service$Wonderjs.sub(/* Float */0, ray[/* origin */0], param[/* center */1]);
  var b = Vector3_JieHuo_Service$Wonderjs.dot(ray[/* direction */1], v1);
  var c = Vector3_JieHuo_Service$Wonderjs.dot(v1, v1) - radius * radius;
  var v2 = b * b - c;
  var match = v2 < 0;
  if (match) {
    return false;
  } else {
    var sqrtV2 = Math.sqrt(v2);
    var t0 = -b + sqrtV2;
    var t1 = -b - sqrtV2;
    var match$1 = t0 < 0 && t1 < 0;
    if (match$1) {
      return false;
    } else {
      return true;
    }
  }
}

function _checkIntersectTriangleForFrontCull(param, param$1, param$2) {
  var direction = param$2[/* direction */1];
  var origin = param$2[/* origin */0];
  var inv_det = 1 / param[0];
  var tvec = Vector3Service$Wonderjs.sub(/* Float */0, origin, param$1[0]);
  var u = Vector3_JieHuo_Service$Wonderjs.dot(tvec, param[3]) * inv_det;
  var match = u < 0 || u > 1;
  if (match) {
    return undefined;
  } else {
    var qvec = Vector3Service$Wonderjs.cross(tvec, param[1]);
    var v = Vector3_JieHuo_Service$Wonderjs.dot(direction, qvec) * inv_det;
    var match$1 = v < 0 || u + v > 1;
    if (match$1) {
      return undefined;
    } else {
      var t = Vector3_JieHuo_Service$Wonderjs.dot(param[2], qvec) * inv_det;
      return Vector3Service$Wonderjs.add(/* Float */0, origin, Vector3_JieHuo_Service$Wonderjs.multiplyScalar(direction, t));
    }
  }
}

function _checkIntersectTriangleForBackAndNoneCull(cullType, param, ray) {
  var direction = ray[/* direction */1];
  var va = param[0];
  var edge1 = Vector3Service$Wonderjs.sub(/* Float */0, param[1], va);
  var edge2 = Vector3Service$Wonderjs.sub(/* Float */0, param[2], va);
  var normal = Vector3Service$Wonderjs.cross(edge1, edge2);
  var ddn = Vector3_JieHuo_Service$Wonderjs.dot(direction, normal);
  var isBackfaceCulling;
  if (cullType >= 3) {
    throw [
          Caml_builtin_exceptions.match_failure,
          /* tuple */[
            "RayIntersectUtils.re",
            173,
            4
          ]
        ];
  } else {
    switch (cullType) {
      case 0 : 
          isBackfaceCulling = true;
          break;
      case 1 : 
          throw [
                Caml_builtin_exceptions.match_failure,
                /* tuple */[
                  "RayIntersectUtils.re",
                  173,
                  4
                ]
              ];
      case 2 : 
          isBackfaceCulling = false;
          break;
      
    }
  }
  var match = ddn > 0 ? (
      isBackfaceCulling ? /* tuple */[
          false,
          0,
          ddn
        ] : /* tuple */[
          undefined,
          1,
          ddn
        ]
    ) : (
      ddn < 0 ? /* tuple */[
          undefined,
          -1,
          -ddn
        ] : /* tuple */[
          false,
          0,
          ddn
        ]
    );
  if (match[0] !== undefined) {
    return undefined;
  } else {
    var ddn$1 = match[2];
    var sign = match[1];
    var diff = Vector3Service$Wonderjs.sub(/* Float */0, ray[/* origin */0], va);
    var edge2$1 = Vector3Service$Wonderjs.cross(diff, edge2);
    var ddqxe2 = sign * Vector3_JieHuo_Service$Wonderjs.dot(direction, edge2$1);
    if (ddqxe2 < 0) {
      return undefined;
    } else {
      var dde1xq = sign * Vector3_JieHuo_Service$Wonderjs.dot(direction, Vector3Service$Wonderjs.cross(edge1, diff));
      if (dde1xq < 0 || ddqxe2 + dde1xq > ddn$1) {
        return undefined;
      } else {
        var qdn = -sign * Vector3_JieHuo_Service$Wonderjs.dot(diff, normal);
        var match$1 = qdn < 0;
        if (match$1) {
          return undefined;
        } else {
          return _at(qdn / ddn$1, ray);
        }
      }
    }
  }
}

function checkIntersectTriangle(cullType, param, ray) {
  var direction = ray[/* direction */1];
  var vc = param[2];
  var vb = param[1];
  var va = param[0];
  var exit = 0;
  if (cullType !== 0) {
    switch (cullType - 1 | 0) {
      case 0 : 
          var edge1 = Vector3Service$Wonderjs.sub(/* Float */0, vb, va);
          var edge2 = Vector3Service$Wonderjs.sub(/* Float */0, vc, va);
          var pvec = Vector3Service$Wonderjs.cross(direction, edge2);
          var det = Vector3_JieHuo_Service$Wonderjs.dot(edge1, pvec);
          var match = det > 0.000001;
          if (match) {
            return undefined;
          } else {
            return _checkIntersectTriangleForFrontCull(/* tuple */[
                        det,
                        edge1,
                        edge2,
                        pvec
                      ], /* tuple */[
                        va,
                        vb,
                        vc
                      ], /* record */[
                        /* origin */ray[/* origin */0],
                        /* direction */direction
                      ]);
          }
      case 1 : 
          exit = 1;
          break;
      case 2 : 
          return undefined;
      
    }
  } else {
    exit = 1;
  }
  if (exit === 1) {
    return _checkIntersectTriangleForBackAndNoneCull(cullType, /* tuple */[
                va,
                vb,
                vc
              ], ray);
  }
  
}

export {
  _at ,
  isIntersectAABB ,
  isIntersectOBB ,
  isIntersectSphere ,
  _checkIntersectTriangleForFrontCull ,
  _checkIntersectTriangleForBackAndNoneCull ,
  checkIntersectTriangle ,
  
}
/* RayUtils-Wonderjs Not a pure module */
