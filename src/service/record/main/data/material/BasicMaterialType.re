open ComponentType;

open MaterialType;

type basicMaterialRecord = {
  index: int,
  buffer: WorkerType.sharedArrayBuffer,
  shaderIndices: Js.Typed_array.Uint32Array.t,
  colors: Js.Typed_array.Float32Array.t,
  textureIndices: Js.Typed_array.Uint32Array.t,
  mapUnits: Js.Typed_array.Uint8Array.t,
  textureCountMap: WonderCommonlib.SparseMapService.t(int),
  defaultColor: array(float),
  gameObjectMap,
  groupCountMap,
  disposedIndexArray,
  mutable materialArrayForWorkerInit: array(int)
};