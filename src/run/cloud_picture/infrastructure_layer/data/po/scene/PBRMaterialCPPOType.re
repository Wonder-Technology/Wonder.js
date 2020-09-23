type pbrMaterial = {
  maxIndex: ComponentCPPOType.index,
  buffer: SharedArrayBufferCPPOType.sharedArrayBuffer,
  mutable diffuseColors: Js.Typed_array.Float32Array.t,
  mutable speculars: Js.Typed_array.Float32Array.t,
  mutable roughnesses: Js.Typed_array.Float32Array.t,
  mutable metalnesses: Js.Typed_array.Float32Array.t,
  defaultDiffuseColor: VectorCPPOType.vec3,
  defaultSpecular: float,
  defaultRoughness: float,
  defaultMetalness: float,
  gameObjectsMap: ComponentCPPOType.gameObjectsMap,
  diffuseMapImageIdMap:
    ImmutableSparseMap.t(PBRMaterialPOType.pbrMaterial, ImagePOType.id),
  metalRoughnessMapImageIdMap:
    ImmutableSparseMap.t(PBRMaterialPOType.pbrMaterial, ImagePOType.id),
  emissionMapImageIdMap:
    ImmutableSparseMap.t(PBRMaterialPOType.pbrMaterial, ImagePOType.id),
  normalMapImageIdMap:
    ImmutableSparseMap.t(PBRMaterialPOType.pbrMaterial, ImagePOType.id),
};
