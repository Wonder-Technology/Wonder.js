open VboBufferType;

let create = () => {
  customGeometryVertexBufferMap: WonderCommonlib.SparseMapService.createEmpty(),
  customGeometryTexCoordBufferMap: WonderCommonlib.SparseMapService.createEmpty(),
  customGeometryNormalBufferMap: WonderCommonlib.SparseMapService.createEmpty(),
  customGeometryElementArrayBufferMap: WonderCommonlib.SparseMapService.createEmpty(),
  matrixInstanceBufferMap: WonderCommonlib.SparseMapService.createEmpty(),
  vertexArrayBufferPool: WonderCommonlib.ArrayService.createEmpty(),
  elementArrayBufferPool: WonderCommonlib.ArrayService.createEmpty(),
  matrixInstanceBufferPool: WonderCommonlib.ArrayService.createEmpty()
};

let deepCopyForRestore = (record) => {
  customGeometryVertexBufferMap: [||],
  customGeometryTexCoordBufferMap: [||],
  customGeometryNormalBufferMap: [||],
  customGeometryElementArrayBufferMap: [||],
  matrixInstanceBufferMap: [||],
  vertexArrayBufferPool: [||],
  elementArrayBufferPool: [||],
  matrixInstanceBufferPool: [||]
};