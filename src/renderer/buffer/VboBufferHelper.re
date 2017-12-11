open VboBufferType;

let initData = () => {
  vertexBufferMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  elementArrayBufferMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  modelMatrixInstanceBufferMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  vertexArrayBufferPool: WonderCommonlib.ArraySystem.createEmpty(),
  groupVertexArrayBufferMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  elementArrayBufferPool: WonderCommonlib.ArraySystem.createEmpty(),
  groupElementArrayBufferMap: WonderCommonlib.SparseMapSystem.createEmpty()
};