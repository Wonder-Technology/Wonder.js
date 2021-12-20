open StateType

let add = ({gameObjectMap, gameObjectBasicCameraViewMap} as state, gameObject, cameraView) => {
  let gameObject = gameObject->GameObjectTypeConvertUtils.gameObjectToInt

  {
    ...state,
    gameObjectMap: gameObjectMap->WonderCommonlib.ImmutableSparseMap.set(
      cameraView,
      gameObject,
    ),
    gameObjectBasicCameraViewMap: gameObjectBasicCameraViewMap->WonderCommonlib.ImmutableSparseMap.set(
      gameObject,
      cameraView,
    ),
  }
}
