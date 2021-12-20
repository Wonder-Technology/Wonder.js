type arcballCameraController = WonderCommonlib.ComponentType.index

type config = {isDebug: bool}

type state = {
  config: config,
  maxIndex: WonderCommonlib.ComponentType.index,
  gameObjectMap: WonderCommonlib.ComponentType.gameObjectMap,
  dirtyMap: WonderCommonlib.ImmutableSparseMap.t<arcballCameraController, bool>,
  distanceMap: WonderCommonlib.ImmutableSparseMap.t<arcballCameraController, float>,
  minDistanceMap: WonderCommonlib.ImmutableSparseMap.t<arcballCameraController, float>,
  phiMap: WonderCommonlib.ImmutableSparseMap.t<arcballCameraController, float>,
  thetaMap: WonderCommonlib.ImmutableSparseMap.t<arcballCameraController, float>,
  thetaMarginMap: WonderCommonlib.ImmutableSparseMap.t<arcballCameraController, float>,
  targetMap: WonderCommonlib.ImmutableSparseMap.t<
    arcballCameraController,
    (float, float, float),
  >,
  moveSpeedXMap: WonderCommonlib.ImmutableSparseMap.t<arcballCameraController, float>,
  moveSpeedYMap: WonderCommonlib.ImmutableSparseMap.t<arcballCameraController, float>,
  rotateSpeedMap: WonderCommonlib.ImmutableSparseMap.t<arcballCameraController, float>,
  wheelSpeedMap: WonderCommonlib.ImmutableSparseMap.t<arcballCameraController, float>,
  gameObjectArcballCameraControllerMap: WonderCommonlib.ImmutableSparseMap.t<
    WonderCore.IGameObjectForJs.gameObject,
    arcballCameraController,
  >,
}
