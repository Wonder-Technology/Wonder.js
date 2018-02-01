open GlType;

type vboBufferData = {
  vertexBufferMap: array(buffer),
  normalBufferMap: array(buffer),
  elementArrayBufferMap: array(buffer),
  modelMatrixInstanceBufferMap: array(buffer),
  vertexArrayBufferPool: array(buffer),
  elementArrayBufferPool: array(buffer),
  modelMatrixInstanceBufferPool: array(buffer)
};