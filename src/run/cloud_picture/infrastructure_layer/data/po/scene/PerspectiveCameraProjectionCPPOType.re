type perspectiveCameraProjection = {
  maxIndex: ComponentCPPOType.index,
  dirtyList: list(ComponentCPPOType.index),
  pMatrixMap:
    ImmutableSparseMap.t(
      ComponentCPPOType.index,
      Js.Typed_array.Float32Array.t,
    ),
  nearMap: ImmutableSparseMap.t(ComponentCPPOType.index, float),
  farMap: ImmutableSparseMap.t(ComponentCPPOType.index, float),
  fovyMap: ImmutableSparseMap.t(ComponentCPPOType.index, float),
  aspectMap: ImmutableSparseMap.t(ComponentCPPOType.index, float),
  gameObjectMap: ComponentCPPOType.gameObjectMap,
};
