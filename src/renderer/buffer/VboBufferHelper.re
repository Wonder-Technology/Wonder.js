open VboBufferType;

let initData = () => {
  vertexBufferMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  elementArrayBufferMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  modelMatrixInstanceBufferMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  vertexArrayBufferPool: WonderCommonlib.ArraySystem.createEmpty(),
  elementArrayBufferPool: WonderCommonlib.ArraySystem.createEmpty()
};