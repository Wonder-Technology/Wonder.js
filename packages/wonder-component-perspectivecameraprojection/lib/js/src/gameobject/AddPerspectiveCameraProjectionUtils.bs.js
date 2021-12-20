'use strict';

var ImmutableSparseMap$WonderCommonlib = require("wonder-commonlib/lib/js/src/structure/sparse_map/ImmutableSparseMap.bs.js");

function add(state, gameObject, cameraProjection) {
  return {
          config: state.config,
          maxIndex: state.maxIndex,
          dirtyMap: state.dirtyMap,
          pMatrixMap: state.pMatrixMap,
          nearMap: state.nearMap,
          farMap: state.farMap,
          fovyMap: state.fovyMap,
          aspectMap: state.aspectMap,
          gameObjectMap: ImmutableSparseMap$WonderCommonlib.set(state.gameObjectMap, cameraProjection, gameObject),
          gameObjectPerspectiveCameraProjectionMap: ImmutableSparseMap$WonderCommonlib.set(state.gameObjectPerspectiveCameraProjectionMap, gameObject, cameraProjection)
        };
}

exports.add = add;
/* No side effect */
