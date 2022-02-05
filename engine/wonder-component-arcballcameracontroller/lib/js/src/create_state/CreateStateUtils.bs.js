'use strict';

var ImmutableSparseMap$WonderCommonlib = require("wonder-commonlib/lib/js/src/structure/sparse_map/ImmutableSparseMap.bs.js");

function createState(isDebug) {
  return {
          config: {
            isDebug: isDebug
          },
          maxIndex: 0,
          gameObjectMap: ImmutableSparseMap$WonderCommonlib.createEmpty(undefined, undefined),
          dirtyMap: ImmutableSparseMap$WonderCommonlib.createEmpty(undefined, undefined),
          distanceMap: ImmutableSparseMap$WonderCommonlib.createEmpty(undefined, undefined),
          minDistanceMap: ImmutableSparseMap$WonderCommonlib.createEmpty(undefined, undefined),
          phiMap: ImmutableSparseMap$WonderCommonlib.createEmpty(undefined, undefined),
          thetaMap: ImmutableSparseMap$WonderCommonlib.createEmpty(undefined, undefined),
          thetaMarginMap: ImmutableSparseMap$WonderCommonlib.createEmpty(undefined, undefined),
          targetMap: ImmutableSparseMap$WonderCommonlib.createEmpty(undefined, undefined),
          moveSpeedXMap: ImmutableSparseMap$WonderCommonlib.createEmpty(undefined, undefined),
          moveSpeedYMap: ImmutableSparseMap$WonderCommonlib.createEmpty(undefined, undefined),
          rotateSpeedMap: ImmutableSparseMap$WonderCommonlib.createEmpty(undefined, undefined),
          wheelSpeedMap: ImmutableSparseMap$WonderCommonlib.createEmpty(undefined, undefined),
          gameObjectArcballCameraControllerMap: ImmutableSparseMap$WonderCommonlib.createEmpty(undefined, undefined)
        };
}

exports.createState = createState;
/* No side effect */
