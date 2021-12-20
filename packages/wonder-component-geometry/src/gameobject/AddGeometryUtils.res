open StateType

let add = ({gameObjectsMap, gameObjectGeometryMap} as state, gameObject, geometry) => {
  let gameObject = gameObject->GameObjectTypeConvertUtils.gameObjectToInt

  gameObjectsMap->WonderCommonlib.ArrayMapUtils.addValue(geometry, gameObject)->ignore

  gameObjectGeometryMap->WonderCommonlib.MutableSparseMap.set(gameObject, geometry)->ignore

  state
}
