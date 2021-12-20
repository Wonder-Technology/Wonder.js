open StateType

let get = ({gameObjectPerspectiveCameraProjectionMap}, gameObject) => {
  gameObjectPerspectiveCameraProjectionMap
  ->WonderCommonlib.ImmutableSparseMap.unsafeGet(
    gameObject->GameObjectTypeConvertUtils.gameObjectToInt,
  )
  ->Js.Nullable.return
}
