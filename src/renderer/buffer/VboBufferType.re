open GlType;

type vboBufferData = {
  vertexBufferMap: Js.Dict.t(buffer),
  elementArrayBufferMap: Js.Dict.t(buffer),
  arrayBufferPool: array(buffer),
  elementArrayBufferPool: array(buffer)
};