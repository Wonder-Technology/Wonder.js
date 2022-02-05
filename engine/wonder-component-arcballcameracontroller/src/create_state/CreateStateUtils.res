open StateType

let createState = (isDebug: bool) => {
  {
    config: {
      isDebug: isDebug,
    },
    maxIndex: 0,
    dirtyMap: WonderCommonlib.ImmutableSparseMap.createEmpty(),
    gameObjectMap: WonderCommonlib.ImmutableSparseMap.createEmpty(),
    distanceMap: WonderCommonlib.ImmutableSparseMap.createEmpty(),
    minDistanceMap: WonderCommonlib.ImmutableSparseMap.createEmpty(),
    phiMap: WonderCommonlib.ImmutableSparseMap.createEmpty(),
    thetaMap: WonderCommonlib.ImmutableSparseMap.createEmpty(),
    thetaMarginMap: WonderCommonlib.ImmutableSparseMap.createEmpty(),
    targetMap: WonderCommonlib.ImmutableSparseMap.createEmpty(),
    moveSpeedXMap: WonderCommonlib.ImmutableSparseMap.createEmpty(),
    moveSpeedYMap: WonderCommonlib.ImmutableSparseMap.createEmpty(),
    rotateSpeedMap: WonderCommonlib.ImmutableSparseMap.createEmpty(),
    wheelSpeedMap: WonderCommonlib.ImmutableSparseMap.createEmpty(),
    gameObjectArcballCameraControllerMap: WonderCommonlib.ImmutableSparseMap.createEmpty(),
  }
}
