open WonderWebgl.GlType;

type bufferEnum =
  | Vertex
  | Normal
  | TexCoord
  | Index
  | Instance_normal_matrix
  | Instance_m_matrix;

type vboBufferRecord = {
  geometryVertexBufferMap: WonderCommonlib.SparseMapService.t(buffer),
  geometryTexCoordBufferMap: WonderCommonlib.SparseMapService.t(buffer),
  geometryNormalBufferMap: WonderCommonlib.SparseMapService.t(buffer),
  geometryElementArrayBufferMap:
    WonderCommonlib.SparseMapService.t(buffer),
  matrixInstanceBufferMap: WonderCommonlib.SparseMapService.t(buffer),
  vertexArrayBufferPool: array(buffer),
  elementArrayBufferPool: array(buffer),
  matrixInstanceBufferPool: array(buffer),
};

external intToBufferEnum : int => bufferEnum = "%identity";