open StateType

let get = ({gameObjectsMap}, geometry) =>
  gameObjectsMap
  ->WonderCommonlib.MutableSparseMap.get(geometry)
  ->WonderCommonlib.OptionSt.getWithDefault([])
  ->WonderCommonlib.ArraySt.map(GameObjectTypeConvertUtils.intToGameObject)
