type basicCameraView = WonderCommonlib.ComponentType.index

type config = {isDebug: bool}

type state = {
  config: config,
  maxIndex: WonderCommonlib.ComponentType.index,
  isActiveMap: WonderCommonlib.ImmutableSparseMap.t<basicCameraView, bool>,
  gameObjectMap: WonderCommonlib.ComponentType.immutableGameObjectMap,
  gameObjectBasicCameraViewMap: WonderCommonlib.ImmutableSparseMap.t<
    WonderCore.IGameObjectForJs.gameObject,
    basicCameraView,
  >,
}
