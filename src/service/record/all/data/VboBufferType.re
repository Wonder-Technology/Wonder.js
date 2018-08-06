open WonderWebgl.GlType;

type bufferEnum =
  | Vertex
  | Normal
  | TexCoord
  | Index
  | Instance_normal_matrix
  | Instance_m_matrix;

type vboBufferRecord = {
  customGeometryVertexBufferMap: WonderCommonlib.SparseMapService.t(buffer),
  customGeometryTexCoordBufferMap: WonderCommonlib.SparseMapService.t(buffer),
  customGeometryNormalBufferMap: WonderCommonlib.SparseMapService.t(buffer),
  customGeometryElementArrayBufferMap:
    WonderCommonlib.SparseMapService.t(buffer),
  matrixInstanceBufferMap: WonderCommonlib.SparseMapService.t(buffer),
  vertexArrayBufferPool: array(buffer),
  elementArrayBufferPool: array(buffer),
  matrixInstanceBufferPool: array(buffer),
};

external intToBufferEnum : int => bufferEnum = "%identity";