open StateType

let createState = (isDebug: bool) => {
  {
    config: {
      isDebug: isDebug,
    },
    maxIndex: 0,
    dirtyMap: WonderCommonlib.ImmutableSparseMap.createEmpty(),
    pMatrixMap: WonderCommonlib.ImmutableSparseMap.createEmpty(),
    nearMap: WonderCommonlib.ImmutableSparseMap.createEmpty(),
    farMap: WonderCommonlib.ImmutableSparseMap.createEmpty(),
    fovyMap: WonderCommonlib.ImmutableSparseMap.createEmpty(),
    aspectMap: WonderCommonlib.ImmutableSparseMap.createEmpty(),
    gameObjectMap: WonderCommonlib.ImmutableSparseMap.createEmpty(),
    gameObjectPerspectiveCameraProjectionMap: WonderCommonlib.ImmutableSparseMap.createEmpty(),
  }
}
