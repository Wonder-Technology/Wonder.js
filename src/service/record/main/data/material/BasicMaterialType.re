open ComponentType;

open MaterialType;

type basicMaterial = int;

type basicMaterialRecord = {
  index: int,
  buffer: WorkerType.sharedArrayBuffer,
  shaderIndices: Js.Typed_array.Uint32Array.t,
  colors: Js.Typed_array.Float32Array.t,
  isDepthTests: Js.Typed_array.Uint8Array.t,
  alphas: Js.Typed_array.Float32Array.t,
  defaultColor: array(float),
  gameObjectsMap,
  disposedIndexArray,
  nameMap: WonderCommonlib.MutableSparseMapService.t(string),
  mutable materialArrayForWorkerInit: array(int),
};