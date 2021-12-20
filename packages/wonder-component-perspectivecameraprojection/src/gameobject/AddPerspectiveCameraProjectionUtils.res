open StateType

let add = (
  {gameObjectMap, gameObjectPerspectiveCameraProjectionMap} as state,
  gameObject,
  cameraProjection,
) => {
  let gameObject = gameObject->GameObjectTypeConvertUtils.gameObjectToInt

  {
    ...state,
    gameObjectMap: gameObjectMap->WonderCommonlib.ImmutableSparseMap.set(
      cameraProjection,
      gameObject,
    ),
    gameObjectPerspectiveCameraProjectionMap: gameObjectPerspectiveCameraProjectionMap->WonderCommonlib.ImmutableSparseMap.set(
      gameObject,
      cameraProjection,
    ),
  }
}
