open VboBufferType;

let create = () => {
  boxGeometryVertexBufferMap: WonderCommonlib.SparseMapService.createEmpty(),
  boxGeometryTexCoordBufferMap: WonderCommonlib.SparseMapService.createEmpty(),
  boxGeometryNormalBufferMap: WonderCommonlib.SparseMapService.createEmpty(),
  boxGeometryElementArrayBufferMap: WonderCommonlib.SparseMapService.createEmpty(),
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
  boxGeometryVertexBufferMap: [||],
  boxGeometryTexCoordBufferMap: [||],
  boxGeometryNormalBufferMap: [||],
  boxGeometryElementArrayBufferMap: [||],
  customGeometryVertexBufferMap: [||],
  customGeometryTexCoordBufferMap: [||],
  customGeometryNormalBufferMap: [||],
  customGeometryElementArrayBufferMap: [||],
  matrixInstanceBufferMap: [||],
  vertexArrayBufferPool: [||],
  elementArrayBufferPool: [||],
  matrixInstanceBufferPool: [||]
};