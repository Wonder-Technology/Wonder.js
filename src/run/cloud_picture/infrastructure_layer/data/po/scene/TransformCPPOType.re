type transform = {
  maxIndex: ComponentCPPOType.index,
  buffer: SharedArrayBufferCPPOType.sharedArrayBuffer,
  mutable localToWorldMatrices: Js.Typed_array.Float32Array.t,
  mutable localPositions: Js.Typed_array.Float32Array.t,
  mutable localRotations: Js.Typed_array.Float32Array.t,
  mutable localScales: Js.Typed_array.Float32Array.t,
  defaultLocalToWorldMatrix: Matrix4CPPOType.mat,
  defaultLocalPosition: VectorCPPOType.vec3,
  defaultLocalRotation: VectorCPPOType.vec4,
  defaultLocalScale: VectorCPPOType.vec3,
  parentMap:
    ImmutableSparseMap.t(ComponentCPPOType.index, ComponentCPPOType.index),
  childrenMap:
    ImmutableSparseMap.t(
      ComponentCPPOType.index,
      list(ComponentCPPOType.index),
    ),
  gameObjectMap: ComponentCPPOType.gameObjectMap,
  dirtyMap: ImmutableSparseMap.t(ComponentCPPOType.index, bool),
};
