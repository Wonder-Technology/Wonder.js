'use strict';

var ImmutableSparseMap$WonderCommonlib = require("wonder-commonlib/lib/js/src/structure/sparse_map/ImmutableSparseMap.bs.js");

function add(state, gameObject, cameraView) {
  return {
          config: state.config,
          maxIndex: state.maxIndex,
          isActiveMap: state.isActiveMap,
          gameObjectMap: ImmutableSparseMap$WonderCommonlib.set(state.gameObjectMap, cameraView, gameObject),
          gameObjectBasicCameraViewMap: ImmutableSparseMap$WonderCommonlib.set(state.gameObjectBasicCameraViewMap, gameObject, cameraView)
        };
}

exports.add = add;
/* No side effect */
