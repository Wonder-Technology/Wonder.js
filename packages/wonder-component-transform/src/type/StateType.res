type transform = WonderComponentTypeTransform.Index.transform

// type parent = transform

type child = transform

type children = array<child>

// type position = (float, float, float)

// type rotation = (float, float, float, float)

// type scale = (float, float, float)

// type localToWorldMatrix = Js.Typed_array.Float32Array.t

// type normalMatrix = Js.Typed_array.Float32Array.t

// type eulerAngles = (float, float, float)

type config = {
  isDebug: bool,
  transformCount: int,
  float9Array1: Js.Typed_array.Float32Array.t,
  float32Array1: Js.Typed_array.Float32Array.t,
}

type state = {
  config: config,
  mutable maxIndex: WonderCommonlib.ComponentType.index,
  buffer: WonderCommonlib.SharedArrayBufferType.sharedArrayBuffer,
  mutable localToWorldMatrices: Js.Typed_array.Float32Array.t,
  mutable localPositions: Js.Typed_array.Float32Array.t,
  mutable localRotations: Js.Typed_array.Float32Array.t,
  mutable localScales: Js.Typed_array.Float32Array.t,
  defaultLocalToWorldMatrix: WonderCommonlib.Matrix4Type.mat,
  defaultLocalPosition: WonderCommonlib.VectorType.vec3,
  defaultLocalRotation: WonderCommonlib.VectorType.vec4,
  defaultLocalScale: WonderCommonlib.VectorType.vec3,
  parentMap: WonderCommonlib.MutableSparseMap.t<transform, transform>,
  childrenMap: WonderCommonlib.MutableSparseMap.t<transform, children>,
  gameObjectMap: WonderCommonlib.ComponentType.gameObjectMap,
  gameObjectTransformMap: WonderCommonlib.MutableSparseMap.t<
    WonderCore.IGameObjectForJs.gameObject,
    transform,
  >,
  dirtyMap: WonderCommonlib.MutableSparseMap.t<transform, bool>,
}
