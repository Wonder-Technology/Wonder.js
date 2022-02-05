

import * as Log$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/log/Log.bs.js";
import * as Contract$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/contract/Contract.bs.js";
import * as MutableSparseMap$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/structure/sparse_map/MutableSparseMap.bs.js";
import * as ImmutableSparseMap$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/structure/sparse_map/ImmutableSparseMap.bs.js";
import * as ConfigUtils$WonderComponentPerspectivecameraprojection from "../config/ConfigUtils.bs.js";

function mark(state, cameraProjection, isDirty) {
  return {
          config: state.config,
          maxIndex: state.maxIndex,
          dirtyMap: ImmutableSparseMap$WonderCommonlib.set(state.dirtyMap, cameraProjection, isDirty),
          pMatrixMap: state.pMatrixMap,
          nearMap: state.nearMap,
          farMap: state.farMap,
          fovyMap: state.fovyMap,
          aspectMap: state.aspectMap,
          gameObjectMap: state.gameObjectMap,
          gameObjectPerspectiveCameraProjectionMap: state.gameObjectPerspectiveCameraProjectionMap
        };
}

function isDirty(state, cameraProjection) {
  return MutableSparseMap$WonderCommonlib.unsafeGet(state.dirtyMap, cameraProjection) === Contract$WonderCommonlib.ensureCheck(true, (function (isDirty) {
                return Contract$WonderCommonlib.test(Log$WonderCommonlib.buildAssertMessage("return bool", "not"), (function (param) {
                              return Contract$WonderCommonlib.assertIsBool(isDirty);
                            }));
              }), ConfigUtils$WonderComponentPerspectivecameraprojection.getIsDebug(state));
}

export {
  mark ,
  isDirty ,
  
}
/* No side effect */
