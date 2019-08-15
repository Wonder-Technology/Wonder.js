let buildExtendData =
    (
      ~funcMap=WonderCommonlib.ImmutableHashMapService.createEmpty(),
      ~allSkinDataMap=WonderCommonlib.ImmutableHashMapService.createEmpty(),
      (),
    )
    : SceneGraphType.extendData => {
  customControlData: {
    funcMap: funcMap,
  },
  skinData: {
    allSkinDataMap: allSkinDataMap,
  },
};