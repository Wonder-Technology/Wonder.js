open StateType

let get = ({gameObjectGeometryMap}, gameObject) => {
  gameObjectGeometryMap->WonderCommonlib.MutableSparseMap.getNullable(
    gameObject->GameObjectTypeConvertUtils.gameObjectToInt,
  )
}
