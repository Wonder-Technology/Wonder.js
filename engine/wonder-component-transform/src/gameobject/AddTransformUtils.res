open StateType

let add = ({gameObjectMap, gameObjectTransformMap} as state, gameObject, transform) => {
  let gameObject = gameObject->GameObjectTypeConvertUtils.gameObjectToInt

  gameObjectMap->WonderCommonlib.MutableSparseMap.set(transform, gameObject)->ignore

  gameObjectTransformMap->WonderCommonlib.MutableSparseMap.set(gameObject, transform)->ignore

  state
}
