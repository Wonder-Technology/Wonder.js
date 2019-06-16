type lightMaterialRecord = {
  diffuseMapUnitMap:
    WonderCommonlib.MutableSparseMapService.t(TextureType.textureUnit),
  specularMapUnitMap:
    WonderCommonlib.MutableSparseMapService.t(TextureType.textureUnit),
  shaderIndices: Js.Typed_array.Uint32Array.t,
  diffuseColors: Js.Typed_array.Float32Array.t,
  specularColors: Js.Typed_array.Float32Array.t,
  shininess: Js.Typed_array.Float32Array.t,
  diffuseTextureIndices: Js.Typed_array.Uint32Array.t,
  specularTextureIndices: Js.Typed_array.Uint32Array.t,
};