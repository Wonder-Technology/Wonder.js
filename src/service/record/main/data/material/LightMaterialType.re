open ComponentType;

open MaterialType;

type lightMaterialRecord = {
  index: int,
  buffer: WorkerType.sharedArrayBuffer,
  shaderIndices: Js.Typed_array.Uint32Array.t,
  diffuseColors: Js.Typed_array.Float32Array.t,
  specularColors: Js.Typed_array.Float32Array.t,
  shininess: Js.Typed_array.Float32Array.t,
  textureIndices: Js.Typed_array.Uint32Array.t,
  diffuseMapUnits: Js.Typed_array.Uint8Array.t,
  specularMapUnits: Js.Typed_array.Uint8Array.t,
  copiedShaderIndices: Js.Typed_array.Uint32Array.t,
  copiedDiffuseColors: Js.Typed_array.Float32Array.t,
  copiedSpecularColors: Js.Typed_array.Float32Array.t,
  copiedShininess: Js.Typed_array.Float32Array.t,
  copiedTextureIndices: Js.Typed_array.Uint32Array.t,
  copiedDiffuseMapUnits: Js.Typed_array.Uint8Array.t,
  copiedSpecularMapUnits: Js.Typed_array.Uint8Array.t,
  emptyMapUnitArrayMap: WonderCommonlib.SparseMapService.t(array(int)),
  defaultDiffuseColor: array(float),
  defaultSpecularColor: array(float),
  defaultShininess: float,
  gameObjectsMap,
  disposedIndexArray,
  nameMap: WonderCommonlib.SparseMapService.t(string),
  mutable materialArrayForWorkerInit: array(int),
};