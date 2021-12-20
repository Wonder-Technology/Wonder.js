

import * as TypeArrayUtils$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/component/TypeArrayUtils.bs.js";
import * as ConfigUtils$WonderComponentGeometry from "../config/ConfigUtils.bs.js";
import * as BufferGeometryUtils$WonderComponentWorkerUtils from "../../../../../../node_modules/wonder-component-worker-utils/lib/es6_global/src/geometry/BufferGeometryUtils.bs.js";
import * as ReallocatedPointsGeometryUtils$WonderComponentGeometry from "./ReallocatedPointsGeometryUtils.bs.js";

function setIndices(state, geometry, data) {
  var indices = state.indices;
  var indicesInfos = state.indicesInfos;
  var indicesOffset = state.indicesOffset;
  state.indicesOffset = ReallocatedPointsGeometryUtils$WonderComponentGeometry.setUint32PointData([
        BufferGeometryUtils$WonderComponentWorkerUtils.getInfoIndex(geometry),
        indicesInfos,
        indicesOffset,
        data.length
      ], ConfigUtils$WonderComponentGeometry.getIsDebug(state), (function (param) {
          return TypeArrayUtils$WonderCommonlib.fillUint32ArrayWithOffset(indices, data, param);
        }));
  return state;
}

export {
  setIndices ,
  
}
/* No side effect */
