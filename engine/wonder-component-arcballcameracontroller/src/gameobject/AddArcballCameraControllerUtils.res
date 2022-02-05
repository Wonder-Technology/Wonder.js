open StateType

let add = (
  {gameObjectMap, gameObjectArcballCameraControllerMap} as state,
  gameObject,
  cameraController,
) => {
  let gameObject = gameObject->GameObjectTypeConvertUtils.gameObjectToInt

  {
    ...state,
    gameObjectMap: gameObjectMap->WonderCommonlib.ImmutableSparseMap.set(
      cameraController,
      gameObject,
    ),
    gameObjectArcballCameraControllerMap: gameObjectArcballCameraControllerMap->WonderCommonlib.ImmutableSparseMap.set(
      gameObject,
      cameraController,
    ),
  }
}
