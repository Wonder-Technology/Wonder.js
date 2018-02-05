open VboBufferType;

let initData = () => {
  vertexBufferMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  normalBufferMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  elementArrayBufferMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  matrixInstanceBufferMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  vertexArrayBufferPool: WonderCommonlib.ArraySystem.createEmpty(),
  elementArrayBufferPool: WonderCommonlib.ArraySystem.createEmpty(),
  matrixInstanceBufferPool: WonderCommonlib.ArraySystem.createEmpty()
};