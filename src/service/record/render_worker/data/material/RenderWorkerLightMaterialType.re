open MaterialType;

type lightMaterialRecord = {
  buffer: WorkerType.sharedArrayBuffer,
  shaderIndices: option(Js.Typed_array.Uint32Array.t),
  diffuseColors: option(Js.Typed_array.Float32Array.t),
  specularColors: option(Js.Typed_array.Float32Array.t),
  shininess: option(Js.Typed_array.Float32Array.t),
  index: int,
  disposedIndexArray,
  isSourceInstanceMap: array(bool)
};