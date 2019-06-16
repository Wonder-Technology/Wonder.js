open ComponentType;

open MaterialType;

type lightMaterial = int;

type lightMaterialRecord = {
  index: int,
  buffer: WorkerType.sharedArrayBuffer,
  shaderIndices: Js.Typed_array.Uint32Array.t,
  diffuseColors: Js.Typed_array.Float32Array.t,
  specularColors: Js.Typed_array.Float32Array.t,
  shininess: Js.Typed_array.Float32Array.t,
  diffuseTextureIndices: Js.Typed_array.Uint32Array.t,
  specularTextureIndices: Js.Typed_array.Uint32Array.t,
  defaultDiffuseColor: array(float),
  defaultSpecularColor: array(float),
  defaultShininess: float,
  gameObjectsMap,
  disposedIndexArray,
  nameMap: WonderCommonlib.MutableSparseMapService.t(string),
  mutable materialArrayForWorkerInit: array(int),
};