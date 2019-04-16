type sceneAssetBundleContent = WDType.wd;

type manifest = {
  hashId: string,
  dependencyRelation:
    WonderCommonlib.ImmutableHashMapService.t(
      array(AllABType.abRelativePath),
    ),
};