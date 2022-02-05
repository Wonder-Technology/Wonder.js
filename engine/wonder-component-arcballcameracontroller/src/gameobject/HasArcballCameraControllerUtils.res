open StateType

let has = ({gameObjectArcballCameraControllerMap}, gameObject) => {
  gameObjectArcballCameraControllerMap->WonderCommonlib.ImmutableSparseMap.has(
    gameObject->GameObjectTypeConvertUtils.gameObjectToInt,
  )
}
