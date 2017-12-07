open GlType;

type vboBufferData = {
  mutable vertexBufferMap: array(buffer),
  mutable elementArrayBufferMap: array(buffer),
  mutable modelMatrixInstanceBufferMap: array(buffer),
  vertexArrayBufferPool: array(buffer),
  groupVertexArrayBufferMap: array(buffer),
  elementArrayBufferPool: array(buffer),
  groupElementArrayBufferMap: array(buffer)
};