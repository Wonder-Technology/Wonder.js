open ComponentType;

open MaterialType;

type basicMaterialRecord = {
  index: int,
  buffer: WorkerType.sharedArrayBuffer,
  shaderIndices: Js.Typed_array.Uint32Array.t,
  colors: Js.Typed_array.Float32Array.t,
  textureIndices: Js.Typed_array.Uint32Array.t,
  mapUnits: Js.Typed_array.Uint8Array.t,
  /* textureCounts: Js.Typed_array.Uint8Array.t, */
  /* mapTextureIndexMap: WonderCommonlib.SparseMapService.t(int), */
  textureCountMap: WonderCommonlib.SparseMapService.t(int),
  /* mapUnitMap: : WonderCommonlib.SparseMapService.t(int), */
  defaultShaderIndex: int,
  defaultColor: array(float),
  gameObjectMap,
  groupCountMap,
  disposedIndexArray,
  mutable materialArrayForWorkerInit: array(int)
};