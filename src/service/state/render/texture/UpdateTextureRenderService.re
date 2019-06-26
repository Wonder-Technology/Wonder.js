let isNeedUpdate =
    (
      textureInTypeArray,
      defaultIsNeedUpdate,
      isNeedUpdates,
      getIsNeedUpdateFunc,
    ) =>
  getIsNeedUpdateFunc(. textureInTypeArray, isNeedUpdates)
  === BufferTextureService.getNeedUpdate();