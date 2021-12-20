type perspectiveCameraProjection = WonderCommonlib.ComponentType.index

type config = {isDebug: bool}

type state = {
  config: config,
  maxIndex: WonderCommonlib.ComponentType.index,
  dirtyMap: WonderCommonlib.ImmutableSparseMap.t<perspectiveCameraProjection, bool>,
  pMatrixMap: WonderCommonlib.ImmutableSparseMap.t<
    perspectiveCameraProjection,
    Js.Typed_array.Float32Array.t,
  >,
  nearMap: WonderCommonlib.ImmutableSparseMap.t<perspectiveCameraProjection, float>,
  farMap: WonderCommonlib.ImmutableSparseMap.t<perspectiveCameraProjection, float>,
  fovyMap: WonderCommonlib.ImmutableSparseMap.t<perspectiveCameraProjection, float>,
  aspectMap: WonderCommonlib.ImmutableSparseMap.t<perspectiveCameraProjection, float>,
  gameObjectMap: WonderCommonlib.ComponentType.immutableGameObjectMap,
  gameObjectPerspectiveCameraProjectionMap: WonderCommonlib.ImmutableSparseMap.t<
    WonderCore.IGameObjectForJs.gameObject,
    perspectiveCameraProjection,
  >,
}
