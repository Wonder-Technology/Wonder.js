

import * as TypeArrayUtils$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/component/TypeArrayUtils.bs.js";
import * as ConfigUtils$WonderComponentGeometry from "../config/ConfigUtils.bs.js";
import * as BufferGeometryUtils$WonderComponentWorkerUtils from "../../../../../../node_modules/wonder-component-worker-utils/lib/es6_global/src/geometry/BufferGeometryUtils.bs.js";
import * as ReallocatedPointsGeometryUtils$WonderComponentGeometry from "./ReallocatedPointsGeometryUtils.bs.js";

function setVertices(state, geometry, data) {
  var vertices = state.vertices;
  var verticesInfos = state.verticesInfos;
  var verticesOffset = state.verticesOffset;
  state.verticesOffset = ReallocatedPointsGeometryUtils$WonderComponentGeometry.setFloat32PointData([
        BufferGeometryUtils$WonderComponentWorkerUtils.getInfoIndex(geometry),
        verticesInfos,
        verticesOffset,
        data.length
      ], ConfigUtils$WonderComponentGeometry.getIsDebug(state), (function (param) {
          return TypeArrayUtils$WonderCommonlib.fillFloat32ArrayWithOffset(vertices, data, param);
        }));
  return state;
}

export {
  setVertices ,
  
}
/* No side effect */
