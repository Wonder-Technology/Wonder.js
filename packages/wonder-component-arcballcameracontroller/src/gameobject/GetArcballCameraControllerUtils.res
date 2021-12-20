open StateType

let get = ({gameObjectArcballCameraControllerMap}, gameObject) => {
  gameObjectArcballCameraControllerMap
  ->WonderCommonlib.ImmutableSparseMap.unsafeGet(
    gameObject->GameObjectTypeConvertUtils.gameObjectToInt,
  )
  ->Js.Nullable.return
}
