

import * as Log$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/log/Log.bs.js";
import * as Contract$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/contract/Contract.bs.js";
import * as TypeArrayUtils$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/component/TypeArrayUtils.bs.js";
import * as ConfigUtils$WonderComponentGeometry from "../config/ConfigUtils.bs.js";
import * as BufferGeometryUtils$WonderComponentWorkerUtils from "../../../../../../node_modules/wonder-component-worker-utils/lib/es6_global/src/geometry/BufferGeometryUtils.bs.js";
import * as ReallocatedPointsGeometryUtils$WonderComponentGeometry from "./ReallocatedPointsGeometryUtils.bs.js";

function setTexCoords(state, geometry, data) {
  Contract$WonderCommonlib.requireCheck((function (param) {
          return Contract$WonderCommonlib.test(Log$WonderCommonlib.buildAssertMessage("texCoords in [0.0, 1.0]", "not"), (function (param) {
                        return TypeArrayUtils$WonderCommonlib.reduceFloat32Array(data, true, (function (result, value) {
                                      if (result && Contract$WonderCommonlib.Operators.$great$eq$dot(value, 0.0)) {
                                        return Contract$WonderCommonlib.Operators.$less$eq$dot(value, 1.0);
                                      } else {
                                        return false;
                                      }
                                    }));
                      }));
        }), ConfigUtils$WonderComponentGeometry.getIsDebug(state));
  var texCoords = state.texCoords;
  var texCoordsInfos = state.texCoordsInfos;
  var texCoordsOffset = state.texCoordsOffset;
  state.texCoordsOffset = ReallocatedPointsGeometryUtils$WonderComponentGeometry.setFloat32PointData([
        BufferGeometryUtils$WonderComponentWorkerUtils.getInfoIndex(geometry),
        texCoordsInfos,
        texCoordsOffset,
        data.length
      ], ConfigUtils$WonderComponentGeometry.getIsDebug(state), (function (param) {
          return TypeArrayUtils$WonderCommonlib.fillFloat32ArrayWithOffset(texCoords, data, param);
        }));
  return state;
}

export {
  setTexCoords ,
  
}
/* No side effect */
