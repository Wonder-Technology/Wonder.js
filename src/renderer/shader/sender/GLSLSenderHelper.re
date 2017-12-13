open StateDataType;

let initData = () => {
  attributeSendDataMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  instanceAttributeSendDataMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  uniformCacheMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  uniformSendArrayDataMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  uniformSendVector3DataMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  shaderUniformSendDataMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  instanceUniformSendDataMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  drawPointsFuncMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  vertexAttribHistoryArray: WonderCommonlib.ArraySystem.createEmpty(),
  lastSendArrayBuffer: None,
  lastSendElementArrayBuffer: None
};