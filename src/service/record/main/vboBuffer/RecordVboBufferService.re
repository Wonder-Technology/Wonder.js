open VboBufferType;

let create = () => {
  geometryVertexBufferMap: WonderCommonlib.SparseMapService.createEmpty(),
  geometryTexCoordBufferMap: WonderCommonlib.SparseMapService.createEmpty(),
  geometryNormalBufferMap: WonderCommonlib.SparseMapService.createEmpty(),
  geometryElementArrayBufferMap: WonderCommonlib.SparseMapService.createEmpty(),
  matrixInstanceBufferMap: WonderCommonlib.SparseMapService.createEmpty(),
  vertexArrayBufferPool: WonderCommonlib.ArrayService.createEmpty(),
  elementArrayBufferPool: WonderCommonlib.ArrayService.createEmpty(),
  matrixInstanceBufferPool: WonderCommonlib.ArrayService.createEmpty()
};

let deepCopyForRestore = (record) => {
  geometryVertexBufferMap: [||],
  geometryTexCoordBufferMap: [||],
  geometryNormalBufferMap: [||],
  geometryElementArrayBufferMap: [||],
  matrixInstanceBufferMap: [||],
  vertexArrayBufferPool: [||],
  elementArrayBufferPool: [||],
  matrixInstanceBufferPool: [||]
};