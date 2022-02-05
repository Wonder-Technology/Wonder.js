open StateType

let has = ({gameObjectTransformMap}, gameObject) => {
  gameObjectTransformMap->WonderCommonlib.MutableSparseMap.has(gameObject -> GameObjectTypeConvertUtils.gameObjectToInt)
}
