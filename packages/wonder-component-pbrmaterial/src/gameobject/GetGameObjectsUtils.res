open StateType

let get = ({gameObjectsMap}, material) =>
  gameObjectsMap
  ->WonderCommonlib.MutableSparseMap.get(material)
  ->WonderCommonlib.OptionSt.getWithDefault([])
  ->WonderCommonlib.ArraySt.map(GameObjectTypeConvertUtils.intToGameObject)
