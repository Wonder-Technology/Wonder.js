

import * as Matrix4$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/math/Matrix4.bs.js";
import * as IndexComponentUtils$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/component/IndexComponentUtils.bs.js";
import * as DirtyPerspectiveCameraProjectionUtils$WonderComponentPerspectivecameraprojection from "../utils/DirtyPerspectiveCameraProjectionUtils.bs.js";
import * as OperatePerspectiveCameraProjectionUtils$WonderComponentPerspectivecameraprojection from "../utils/OperatePerspectiveCameraProjectionUtils.bs.js";

function create(state) {
  var index = state.maxIndex;
  var newIndex = IndexComponentUtils$WonderCommonlib.generateIndex(index);
  var state$1 = OperatePerspectiveCameraProjectionUtils$WonderComponentPerspectivecameraprojection.setPMatrix(DirtyPerspectiveCameraProjectionUtils$WonderComponentPerspectivecameraprojection.mark(state, index, true), index, Matrix4$WonderCommonlib.createIdentityMatrix4(undefined));
  return [
          {
            config: state$1.config,
            maxIndex: newIndex,
            dirtyMap: state$1.dirtyMap,
            pMatrixMap: state$1.pMatrixMap,
            nearMap: state$1.nearMap,
            farMap: state$1.farMap,
            fovyMap: state$1.fovyMap,
            aspectMap: state$1.aspectMap,
            gameObjectMap: state$1.gameObjectMap,
            gameObjectPerspectiveCameraProjectionMap: state$1.gameObjectPerspectiveCameraProjectionMap
          },
          index
        ];
}

export {
  create ,
  
}
/* No side effect */
