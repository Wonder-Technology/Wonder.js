open StateDataType;

let initData = () => {
  attributeSendDataMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  instanceAttributeSendDataMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  uniformCacheMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  uniformSendNoCacheableDataMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  uniformSendCacheableDataMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  shaderUniformSendNoCacheableDataMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  instanceUniformSendNoCacheableDataMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  /* drawPointsFuncMap: WonderCommonlib.SparseMapSystem.createEmpty(), */
  vertexAttribHistoryArray: WonderCommonlib.ArraySystem.createEmpty(),
  lastSendArrayBuffer: None,
  lastSendElementArrayBuffer: None,
  lastSendMaterial: None
};