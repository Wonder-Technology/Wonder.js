'use strict';

var ImmutableSparseMap$WonderCommonlib = require("wonder-commonlib/lib/js/src/structure/sparse_map/ImmutableSparseMap.bs.js");

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

exports.createState = createState;
/* No side effect */
