open WonderWebgl.GlType;

type bufferEnum =
  | Vertex
  | Normal
  | TexCoord
  | Index
  | Instance_normal_matrix
  | Instance_m_matrix;

type vboBufferRecord = {
  geometryVertexBufferMap: WonderCommonlib.MutableSparseMapService.t(buffer),
  geometryTexCoordBufferMap: WonderCommonlib.MutableSparseMapService.t(buffer),
  geometryNormalBufferMap: WonderCommonlib.MutableSparseMapService.t(buffer),
  geometryElementArrayBufferMap:
    WonderCommonlib.MutableSparseMapService.t(buffer),
  matrixInstanceBufferMap: WonderCommonlib.MutableSparseMapService.t(buffer),
  vertexArrayBufferPool: array(buffer),
  elementArrayBufferPool: array(buffer),
  matrixInstanceBufferPool: array(buffer),
};

external intToBufferEnum : int => bufferEnum = "%identity";