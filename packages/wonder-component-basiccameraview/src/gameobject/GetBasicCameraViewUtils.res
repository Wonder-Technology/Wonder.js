open StateType

let get = ({gameObjectBasicCameraViewMap}, gameObject) => {
  gameObjectBasicCameraViewMap
  ->WonderCommonlib.ImmutableSparseMap.unsafeGet(
    gameObject->GameObjectTypeConvertUtils.gameObjectToInt,
  )
  ->Js.Nullable.return
}
