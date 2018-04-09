open ComponentType;

open MaterialType;

type basicMaterialRecord = {
  index: int,
  buffer: WorkerType.sharedArrayBuffer,
  shaderIndices: Js.Typed_array.Uint32Array.t,
  colors: Js.Typed_array.Float32Array.t,
  defaultShaderIndex: int,
  defaultColor: array(float),
  gameObjectMap,
  groupCountMap,
  disposedIndexArray
};