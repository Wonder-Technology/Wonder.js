open StateDataType;

let initData = () => {
  attributeSendDataMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  instanceAttributeSendDataMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  uniformSendDataMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  shaderUniformSendDataMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  drawPointsFuncMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  vertexAttribHistoryArray: WonderCommonlib.ArraySystem.createEmpty(),
  lastSendArrayBuffer: None,
  lastSendElementArrayBuffer: None
};