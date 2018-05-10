open ComponentType;

open MaterialType;

type lightMaterialRecord = {
  index: int,
  buffer: WorkerType.sharedArrayBuffer,
  shaderIndices: Js.Typed_array.Uint32Array.t,
  diffuseColors: Js.Typed_array.Float32Array.t,
  specularColors: Js.Typed_array.Float32Array.t,
  shininess: Js.Typed_array.Float32Array.t,
  defaultDiffuseColor: array(float),
  defaultSpecularColor: array(float),
  defaultShininess: float,
  gameObjectMap,
  groupCountMap,
  disposedIndexArray,
  mutable materialArrayForWorkerInit: array(int)
};