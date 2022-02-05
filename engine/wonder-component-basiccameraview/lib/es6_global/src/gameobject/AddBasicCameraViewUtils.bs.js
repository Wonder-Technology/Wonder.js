

import * as ImmutableSparseMap$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/structure/sparse_map/ImmutableSparseMap.bs.js";

function add(state, gameObject, cameraView) {
  return {
          config: state.config,
          maxIndex: state.maxIndex,
          isActiveMap: state.isActiveMap,
          gameObjectMap: ImmutableSparseMap$WonderCommonlib.set(state.gameObjectMap, cameraView, gameObject),
          gameObjectBasicCameraViewMap: ImmutableSparseMap$WonderCommonlib.set(state.gameObjectBasicCameraViewMap, gameObject, cameraView)
        };
}

export {
  add ,
  
}
/* No side effect */
