open AllVboBufferType;

let create = () => {
  geometryVertexBufferMap: WonderCommonlib.MutableSparseMapService.createEmpty(),
  geometryTexCoordBufferMap: WonderCommonlib.MutableSparseMapService.createEmpty(),
  geometryNormalBufferMap: WonderCommonlib.MutableSparseMapService.createEmpty(),
  geometryElementArrayBufferMap: WonderCommonlib.MutableSparseMapService.createEmpty(),
  matrixInstanceBufferMap: WonderCommonlib.MutableSparseMapService.createEmpty(),
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