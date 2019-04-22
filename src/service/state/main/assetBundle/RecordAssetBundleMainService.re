open AssetBundleType;

open StateDataMainType;

let create = () => {
  assembleRABData: {
    isAssembledMap: WonderCommonlib.ImmutableHashMapService.createEmpty(),
    textureMap: WonderCommonlib.ImmutableHashMapService.createEmpty(),
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
    loadedSABMap: WonderCommonlib.ImmutableHashMapService.createEmpty(),
  },
  wabData: {
    wholeDependencyRelationMap:
      WonderCommonlib.ImmutableHashMapService.createEmpty(),
  },
};