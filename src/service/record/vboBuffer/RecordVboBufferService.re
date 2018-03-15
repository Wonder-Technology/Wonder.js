open VboBufferType;

let create = () => {
  vertexBufferMap: WonderCommonlib.SparseMapService.createEmpty(),
  normalBufferMap: WonderCommonlib.SparseMapService.createEmpty(),
  elementArrayBufferMap: WonderCommonlib.SparseMapService.createEmpty(),
  matrixInstanceBufferMap: WonderCommonlib.SparseMapService.createEmpty(),
  vertexArrayBufferPool: WonderCommonlib.ArrayService.createEmpty(),
  elementArrayBufferPool: WonderCommonlib.ArrayService.createEmpty(),
  matrixInstanceBufferPool: WonderCommonlib.ArrayService.createEmpty()
};

let deepCopyForRestore = (record) => {
  vertexBufferMap: [||],
  normalBufferMap: [||],
  elementArrayBufferMap: [||],
  matrixInstanceBufferMap: [||],
  vertexArrayBufferPool: [||],
  elementArrayBufferPool: [||],
  matrixInstanceBufferPool: [||]
};