

import * as Curry from "../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Js_option from "../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as RayUtils$Wonderjs from "./RayUtils.js";
import * as GeometryAPI$Wonderjs from "../api/geometry/GeometryAPI.js";
import * as Matrix4Service$Wonderjs from "../service/atom/Matrix4Service.js";
import * as RayIntersectUtils$Wonderjs from "./RayIntersectUtils.js";
import * as AbstractIndicesService$Wonderjs from "../service/primitive/geometry/AbstractIndicesService.js";
import * as Vector3_JieHuo_Service$Wonderjs from "./Vector3_JieHuo_Service.js";

function _forEachIndices(param, indices, indicesCount, checkIntersectFunc) {
  var index = 0;
  var checkIntersectData = undefined;
  while(Js_option.isNone(checkIntersectData) && index < indicesCount) {
    checkIntersectData = Curry._3(checkIntersectFunc, AbstractIndicesService$Wonderjs.unsafeGetIndex(index, indices), AbstractIndicesService$Wonderjs.unsafeGetIndex(index + 1 | 0, indices), AbstractIndicesService$Wonderjs.unsafeGetIndex(index + 2 | 0, indices));
    index = index + 3 | 0;
  };
  return checkIntersectData;
}

function _checkIntersect(cullType, param, ray, param$1) {
  return RayIntersectUtils$Wonderjs.checkIntersectTriangle(cullType, /* tuple */[
              param$1[0],
              param$1[1],
              param$1[2]
            ], ray);
}

function _checkIntersectMesh(param, param$1, ray) {
  var vertices = param$1[0];
  var state = param[3];
  var cullType = param[2];
  var geometry = param[0];
  var inverseMatrix = Matrix4Service$Wonderjs.invert(param[1], Matrix4Service$Wonderjs.createIdentityMatrix4(/* () */0));
  var ray$1 = RayUtils$Wonderjs.applyMatrix4(ray, inverseMatrix);
  var match = GeometryAPI$Wonderjs.hasGeometryIndices16(geometry, state);
  return _forEachIndices(/* tuple */[
              geometry,
              state
            ], match ? param$1[1] : param$1[2], param$1[3], (function (index1, index2, index3) {
                return _checkIntersect(cullType, /* tuple */[
                            0,
                            Number.POSITIVE_INFINITY
                          ], ray$1, /* tuple */[
                            Vector3_JieHuo_Service$Wonderjs.fromBufferAttribute(vertices, index1),
                            Vector3_JieHuo_Service$Wonderjs.fromBufferAttribute(vertices, index2),
                            Vector3_JieHuo_Service$Wonderjs.fromBufferAttribute(vertices, index3)
                          ]);
              }));
}

function checkIntersectMesh(ray, param, state) {
  var geometry = param[0];
  return _checkIntersectMesh(/* tuple */[
              geometry,
              param[1],
              param[2],
              state
            ], /* tuple */[
              GeometryAPI$Wonderjs.getGeometryVertices(geometry, state),
              GeometryAPI$Wonderjs.getGeometryIndices16(geometry, state),
              GeometryAPI$Wonderjs.getGeometryIndices32(geometry, state),
              GeometryAPI$Wonderjs.getGeometryIndicesCount(geometry, state)
            ], ray);
}

export {
  _forEachIndices ,
  _checkIntersect ,
  _checkIntersectMesh ,
  checkIntersectMesh ,
  
}
/* RayUtils-Wonderjs Not a pure module */
