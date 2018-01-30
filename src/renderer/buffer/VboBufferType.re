open GlType;

type vboBufferData = {
  mutable vertexBufferMap: array(buffer),
  mutable normalBufferMap: array(buffer),
  mutable elementArrayBufferMap: array(buffer),
  mutable modelMatrixInstanceBufferMap: array(buffer),
  vertexArrayBufferPool: array(buffer),
  elementArrayBufferPool: array(buffer),
  modelMatrixInstanceBufferPool: array(buffer)
};