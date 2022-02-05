open StateType

let get = ({gameObjectPBRMaterialMap}, gameObject) => {
  gameObjectPBRMaterialMap
  ->WonderCommonlib.MutableSparseMap.unsafeGet(
    gameObject->GameObjectTypeConvertUtils.gameObjectToInt,
  )
  ->Js.Nullable.return
}
