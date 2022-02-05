open StateType

let has = ({gameObjectPerspectiveCameraProjectionMap}, gameObject) => {
  gameObjectPerspectiveCameraProjectionMap->WonderCommonlib.ImmutableSparseMap.has(
    gameObject->GameObjectTypeConvertUtils.gameObjectToInt,
  )
}
