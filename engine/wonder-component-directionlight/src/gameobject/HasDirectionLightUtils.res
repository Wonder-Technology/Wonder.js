open StateType

let has = ({gameObjectDirectionLightMap}, gameObject) => {
  gameObjectDirectionLightMap->WonderCommonlib.MutableSparseMap.has(gameObject -> GameObjectTypeConvertUtils.gameObjectToInt)
}
