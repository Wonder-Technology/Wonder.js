let createPO = (): POType.po => {
  allRegisteredWorkPluginData: list{},
  states: WonderCommonlib.ImmutableHashMap.createEmpty(),
  pluginData: {
    isDebug: false,
  },
  componentData: {
    allRegisteredComponentData: WonderCommonlib.ImmutableHashMap.createEmpty(),
    allUsedComponentData: WonderCommonlib.MutableHashMap.createEmpty(),
  },
  gameObjectData: None,
  usedGameObjectData: None,
}
