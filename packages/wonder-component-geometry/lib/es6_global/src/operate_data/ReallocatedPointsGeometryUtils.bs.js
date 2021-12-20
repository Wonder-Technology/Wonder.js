

import * as Curry from "../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as Log$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/log/Log.bs.js";
import * as Contract$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/contract/Contract.bs.js";
import * as TypeArrayUtils$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/component/TypeArrayUtils.bs.js";
import * as ReallocatedPointsGeometryUtils$WonderComponentWorkerUtils from "../../../../../../node_modules/wonder-component-worker-utils/lib/es6_global/src/geometry/ReallocatedPointsGeometryUtils.bs.js";

function setInfo(infoIndex, startIndex, endIndex, isDebug, infos) {
  Contract$WonderCommonlib.requireCheck((function (param) {
          Contract$WonderCommonlib.test(Log$WonderCommonlib.buildAssertMessage("startIndex >= 0", "is " + startIndex), (function (param) {
                  return Contract$WonderCommonlib.Operators.$great$eq(startIndex, 0);
                }));
          return Contract$WonderCommonlib.test(Log$WonderCommonlib.buildAssertMessage("endIndex >= startIndex", "is " + endIndex), (function (param) {
                        return Contract$WonderCommonlib.Operators.$great$eq(endIndex, startIndex);
                      }));
        }), isDebug);
  TypeArrayUtils$WonderCommonlib.setUint32_1(infoIndex, startIndex, infos);
  return TypeArrayUtils$WonderCommonlib.setUint32_1(infoIndex + 1 | 0, endIndex, infos);
}

function hasPointData(infoIndex, isDebug, infos) {
  var match = ReallocatedPointsGeometryUtils$WonderComponentWorkerUtils.getInfo(infoIndex, isDebug, infos);
  return match[1] > match[0];
}

function _setPointData(param, isDebug, fillTypeArrayFunc) {
  var offset = param[2];
  var newOffset = offset + param[3] | 0;
  setInfo(param[0], offset, newOffset, isDebug, param[1]);
  Curry._1(fillTypeArrayFunc, offset);
  return newOffset;
}

var setFloat32PointData = _setPointData;

var setUint32PointData = _setPointData;

export {
  setInfo ,
  hasPointData ,
  _setPointData ,
  setFloat32PointData ,
  setUint32PointData ,
  
}
/* No side effect */
