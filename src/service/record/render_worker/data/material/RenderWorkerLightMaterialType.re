open MaterialType;

type lightMaterialRecord = {
  shaderIndices: option(Js.Typed_array.Uint32Array.t),
  diffuseColors: option(Js.Typed_array.Float32Array.t),
  specularColors: option(Js.Typed_array.Float32Array.t),
  shininess: option(Js.Typed_array.Float32Array.t),
  diffuseTextureIndices: option(Js.Typed_array.Uint32Array.t),
  specularTextureIndices: option(Js.Typed_array.Uint32Array.t),
  index: int,
  disposedIndexArray,
  isSourceInstanceMap: WonderCommonlib.MutableSparseMapService.t(bool),
};