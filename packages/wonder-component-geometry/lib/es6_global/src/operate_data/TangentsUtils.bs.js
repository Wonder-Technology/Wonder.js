

import * as TypeArrayUtils$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/component/TypeArrayUtils.bs.js";
import * as ConfigUtils$WonderComponentGeometry from "../config/ConfigUtils.bs.js";
import * as BufferGeometryUtils$WonderComponentWorkerUtils from "../../../../../../node_modules/wonder-component-worker-utils/lib/es6_global/src/geometry/BufferGeometryUtils.bs.js";
import * as ReallocatedPointsGeometryUtils$WonderComponentGeometry from "./ReallocatedPointsGeometryUtils.bs.js";

function setTangents(state, geometry, data) {
  var tangents = state.tangents;
  var tangentsInfos = state.tangentsInfos;
  var tangentsOffset = state.tangentsOffset;
  state.tangentsOffset = ReallocatedPointsGeometryUtils$WonderComponentGeometry.setFloat32PointData([
        BufferGeometryUtils$WonderComponentWorkerUtils.getInfoIndex(geometry),
        tangentsInfos,
        tangentsOffset,
        data.length
      ], ConfigUtils$WonderComponentGeometry.getIsDebug(state), (function (param) {
          return TypeArrayUtils$WonderCommonlib.fillFloat32ArrayWithOffset(tangents, data, param);
        }));
  return state;
}

export {
  setTangents ,
  
}
/* No side effect */
