open StateType

let has = ({gameObjectGeometryMap}, gameObject) => {
  gameObjectGeometryMap->WonderCommonlib.MutableSparseMap.has(gameObject -> GameObjectTypeConvertUtils.gameObjectToInt)
}
