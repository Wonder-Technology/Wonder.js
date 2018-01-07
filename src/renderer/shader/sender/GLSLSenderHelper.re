open StateDataType;

let initData = () => {
  attributeSendDataMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  instanceAttributeSendDataMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  uniformCacheMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  uniformSendNoCachableDataMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  uniformSendCachableDataMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  shaderUniformSendNoCachableDataMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  instanceUniformSendNoCachableDataMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  /* drawPointsFuncMap: WonderCommonlib.SparseMapSystem.createEmpty(), */
  vertexAttribHistoryArray: WonderCommonlib.ArraySystem.createEmpty(),
  lastSendArrayBuffer: None,
  lastSendElementArrayBuffer: None,
  lastSendMaterial: None
};