

import * as TypeArrayUtils$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/component/TypeArrayUtils.bs.js";
import * as ConfigUtils$WonderComponentGeometry from "../config/ConfigUtils.bs.js";
import * as BufferGeometryUtils$WonderComponentWorkerUtils from "../../../../../../node_modules/wonder-component-worker-utils/lib/es6_global/src/geometry/BufferGeometryUtils.bs.js";
import * as ReallocatedPointsGeometryUtils$WonderComponentGeometry from "./ReallocatedPointsGeometryUtils.bs.js";

function setNormals(state, geometry, data) {
  var normals = state.normals;
  var normalsInfos = state.normalsInfos;
  var normalsOffset = state.normalsOffset;
  state.normalsOffset = ReallocatedPointsGeometryUtils$WonderComponentGeometry.setFloat32PointData([
        BufferGeometryUtils$WonderComponentWorkerUtils.getInfoIndex(geometry),
        normalsInfos,
        normalsOffset,
        data.length
      ], ConfigUtils$WonderComponentGeometry.getIsDebug(state), (function (param) {
          return TypeArrayUtils$WonderCommonlib.fillFloat32ArrayWithOffset(normals, data, param);
        }));
  return state;
}

export {
  setNormals ,
  
}
/* No side effect */
