open GlType;

type vboBufferData = {
  mutable vertexBufferMap: array(buffer),
  mutable elementArrayBufferMap: array(buffer),
  arrayBufferPool: Js.Dict.t(array(buffer)),
  elementArrayBufferPool: Js.Dict.t(array(buffer))
};