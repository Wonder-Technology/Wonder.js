open StateRenderType;

let create = () => {
  attributeSendDataMap: WonderCommonlib.SparseMapService.createEmpty(),
  instanceAttributeSendDataMap: WonderCommonlib.SparseMapService.createEmpty(),
  uniformCacheMap: WonderCommonlib.SparseMapService.createEmpty(),
  uniformRenderObjectSendModelDataMap: WonderCommonlib.SparseMapService.createEmpty(),
  uniformRenderObjectSendMaterialDataMap: WonderCommonlib.SparseMapService.createEmpty(),
  uniformShaderSendNoCachableDataMap: WonderCommonlib.SparseMapService.createEmpty(),
  uniformShaderSendCachableDataMap: WonderCommonlib.SparseMapService.createEmpty(),
  uniformShaderSendCachableFunctionDataMap: WonderCommonlib.SparseMapService.createEmpty(),
  uniformInstanceSendNoCachableDataMap: WonderCommonlib.SparseMapService.createEmpty(),
  /* drawPointsFuncMap: WonderCommonlib.SparseMapService.createEmpty(), */
  vertexAttribHistoryArray: WonderCommonlib.ArrayService.createEmpty(),
  lastSendMaterialData: None,
  lastSendGeometryData: None
};