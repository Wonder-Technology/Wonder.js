open StateType

let createState = (isDebug: bool) => {
  {
    config: {
      isDebug: isDebug,
    },
    maxIndex: 0,
    isActiveMap: WonderCommonlib.ImmutableSparseMap.createEmpty(),
    gameObjectMap: WonderCommonlib.ImmutableSparseMap.createEmpty(),
    gameObjectBasicCameraViewMap: WonderCommonlib.ImmutableSparseMap.createEmpty(),
  }
}
