open StateDataType;

let initData = () => {
  attributeSendDataMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  instanceAttributeSendDataMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  uniformCacheMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  uniformSendMatrixDataMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  uniformSendVector3DataMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  shaderUniformSendMatrixDataMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  instanceUniformSendMatrixDataMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  drawPointsFuncMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  vertexAttribHistoryArray: WonderCommonlib.ArraySystem.createEmpty(),
  lastSendArrayBuffer: None,
  lastSendElementArrayBuffer: None
};