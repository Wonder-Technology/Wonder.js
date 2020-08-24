type transform = {
  maxIndex: ComponentPOType.index,
  buffer: SharedArrayBufferPOType.sharedArrayBuffer,
  mutable localToWorldMatrices: Js.Typed_array.Float32Array.t,
  mutable localPositions: Js.Typed_array.Float32Array.t,
  mutable localRotations: Js.Typed_array.Float32Array.t,
  mutable localScales: Js.Typed_array.Float32Array.t,
  defaultLocalToWorldMatrix: Matrix4POType.mat,
  defaultLocalPosition: VectorPOType.vec3,
  defaultLocalRotation: VectorPOType.vec4,
  defaultLocalScale: VectorPOType.vec3,
  parentMap:
    ImmutableSparseMap.t(ComponentPOType.index, ComponentPOType.index),
  childMap:
    ImmutableSparseMap.t(ComponentPOType.index, list(ComponentPOType.index)),
  gameObjectMap: ComponentPOType.gameObjectMap,
};
