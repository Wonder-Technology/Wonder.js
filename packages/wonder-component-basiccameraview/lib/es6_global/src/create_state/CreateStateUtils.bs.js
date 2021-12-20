

import * as ImmutableSparseMap$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/structure/sparse_map/ImmutableSparseMap.bs.js";

function createState(isDebug) {
  return {
          config: {
            isDebug: isDebug
          },
          maxIndex: 0,
          isActiveMap: ImmutableSparseMap$WonderCommonlib.createEmpty(undefined, undefined),
          gameObjectMap: ImmutableSparseMap$WonderCommonlib.createEmpty(undefined, undefined),
          gameObjectBasicCameraViewMap: ImmutableSparseMap$WonderCommonlib.createEmpty(undefined, undefined)
        };
}

export {
  createState ,
  
}
/* No side effect */
