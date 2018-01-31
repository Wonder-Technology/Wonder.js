open StateDataType;

let initData = () => {
  attributeSendDataMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  instanceAttributeSendDataMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  uniformCacheMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  uniformRenderObjectSendModelDataMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  uniformRenderObjectSendMaterialDataMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  uniformShaderSendNoCachableDataMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  uniformShaderSendCachableDataMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  uniformShaderSendCachableFunctionDataMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  uniformInstanceSendNoCachableDataMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  /* drawPointsFuncMap: WonderCommonlib.SparseMapSystem.createEmpty(), */
  vertexAttribHistoryArray: WonderCommonlib.ArraySystem.createEmpty(),
  lastSendArrayBuffer: None,
  lastSendElementArrayBuffer: None,
  lastSendMaterial: None
};