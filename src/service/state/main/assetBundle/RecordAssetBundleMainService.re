open AssetBundleType;

open StateDataMainType;

let create = () => {
  assembleRABData: {
    isAssembled: WonderCommonlib.ImmutableHashMapService.createEmpty(),
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
    isAssembled: WonderCommonlib.ImmutableHashMapService.createEmpty(),
    gameObjectMap: WonderCommonlib.ImmutableHashMapService.createEmpty(),
  },
};