open AssetBundleType;

open StateDataMainType;

let create = () => {
  assembleRABData: {
    isLoadedMap: WonderCommonlib.ImmutableHashMapService.createEmpty(),
    loadedRABMap: WonderCommonlib.ImmutableHashMapService.createEmpty(),
    isAssembledMap: WonderCommonlib.ImmutableHashMapService.createEmpty(),
    basicSourceTextureMap:
      WonderCommonlib.ImmutableHashMapService.createEmpty(),
    cubemapTextureMap: WonderCommonlib.ImmutableHashMapService.createEmpty(),
    imageMap: WonderCommonlib.ImmutableHashMapService.createEmpty(),
    basicMaterialMap: WonderCommonlib.ImmutableHashMapService.createEmpty(),
    lightMaterialMap: WonderCommonlib.ImmutableHashMapService.createEmpty(),
    geometryMap: WonderCommonlib.ImmutableHashMapService.createEmpty(),
    scriptEventFunctionDataMap:
      WonderCommonlib.ImmutableHashMapService.createEmpty(),
    scriptAttributeMap: WonderCommonlib.ImmutableHashMapService.createEmpty(),
  },
  assembleSABData: {
    isLoadedMap: WonderCommonlib.ImmutableHashMapService.createEmpty(),
    isAssembledMap: WonderCommonlib.ImmutableHashMapService.createEmpty(),
    loadedSABMap: WonderCommonlib.ImmutableHashMapService.createEmpty(),
  },
  wabData: {
    isLoadedMap: WonderCommonlib.ImmutableHashMapService.createEmpty(),
    loadedWABMap: WonderCommonlib.ImmutableHashMapService.createEmpty(),
    wholeDependencyRelationMap:
      WonderCommonlib.ImmutableHashMapService.createEmpty(),
  },
};