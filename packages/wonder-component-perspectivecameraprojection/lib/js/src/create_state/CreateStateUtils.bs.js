'use strict';

var ImmutableSparseMap$WonderCommonlib = require("wonder-commonlib/lib/js/src/structure/sparse_map/ImmutableSparseMap.bs.js");

function createState(isDebug) {
  return {
          config: {
            isDebug: isDebug
          },
          maxIndex: 0,
          dirtyMap: ImmutableSparseMap$WonderCommonlib.createEmpty(undefined, undefined),
          pMatrixMap: ImmutableSparseMap$WonderCommonlib.createEmpty(undefined, undefined),
          nearMap: ImmutableSparseMap$WonderCommonlib.createEmpty(undefined, undefined),
          farMap: ImmutableSparseMap$WonderCommonlib.createEmpty(undefined, undefined),
          fovyMap: ImmutableSparseMap$WonderCommonlib.createEmpty(undefined, undefined),
          aspectMap: ImmutableSparseMap$WonderCommonlib.createEmpty(undefined, undefined),
          gameObjectMap: ImmutableSparseMap$WonderCommonlib.createEmpty(undefined, undefined),
          gameObjectPerspectiveCameraProjectionMap: ImmutableSparseMap$WonderCommonlib.createEmpty(undefined, undefined)
        };
}

exports.createState = createState;
/* No side effect */
