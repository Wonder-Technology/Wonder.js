open GlType;

type vboBufferData = {
  mutable vertexBufferMap: Js.Dict.t(buffer),
  mutable elementArrayBufferMap: Js.Dict.t(buffer),
  arrayBufferPool: array(buffer),
  elementArrayBufferPool: array(buffer)
};