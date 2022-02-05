open StateType

let has = ({gameObjectPBRMaterialMap}, gameObject) => {
  gameObjectPBRMaterialMap->WonderCommonlib.MutableSparseMap.has(gameObject -> GameObjectTypeConvertUtils.gameObjectToInt)
}
