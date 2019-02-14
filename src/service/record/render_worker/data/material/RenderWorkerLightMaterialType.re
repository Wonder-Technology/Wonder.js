open MaterialType;

type lightMaterialRecord = {
  shaderIndices: option(Js.Typed_array.Uint32Array.t),
  diffuseColors: option(Js.Typed_array.Float32Array.t),
  specularColors: option(Js.Typed_array.Float32Array.t),
  shininess: option(Js.Typed_array.Float32Array.t),
  textureIndices: option(Js.Typed_array.Uint32Array.t),
  diffuseMapUnits: option(Js.Typed_array.Uint8Array.t),
  specularMapUnits: option(Js.Typed_array.Uint8Array.t),
  index: int,
  disposedIndexArray,
  isSourceInstanceMap: WonderCommonlib.MutableSparseMapService.t(bool)
};