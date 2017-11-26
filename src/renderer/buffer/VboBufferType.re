open GlType;

type vboBufferData = {
  mutable vertexBufferMap: array(buffer),
  mutable elementArrayBufferMap: array(buffer),
  arrayBufferPool: array(buffer),
  elementArrayBufferPool: array(buffer)
};