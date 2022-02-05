open StateType

let has = ({gameObjectBasicCameraViewMap}, gameObject) => {
  gameObjectBasicCameraViewMap->WonderCommonlib.ImmutableSparseMap.has(
    gameObject->GameObjectTypeConvertUtils.gameObjectToInt,
  )
}
