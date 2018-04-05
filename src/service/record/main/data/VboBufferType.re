open GlType;

type vboBufferRecord = {
  boxGeometryVertexBufferMap: array(buffer),
  boxGeometryNormalBufferMap: array(buffer),
  boxGeometryElementArrayBufferMap: array(buffer),
  customGeometryVertexBufferMap: array(buffer),
  customGeometryNormalBufferMap: array(buffer),
  customGeometryElementArrayBufferMap: array(buffer),
  matrixInstanceBufferMap: array(buffer),
  vertexArrayBufferPool: array(buffer),
  elementArrayBufferPool: array(buffer),
  matrixInstanceBufferPool: array(buffer)
};