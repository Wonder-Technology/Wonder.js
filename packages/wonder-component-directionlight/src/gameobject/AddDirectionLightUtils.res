open StateType

let add = ({gameObjectMap, gameObjectDirectionLightMap} as state, gameObject, light) => {
  let gameObject = gameObject->GameObjectTypeConvertUtils.gameObjectToInt

  gameObjectMap->WonderCommonlib.MutableSparseMap.set(light, gameObject)->ignore

  gameObjectDirectionLightMap->WonderCommonlib.MutableSparseMap.set(gameObject, light)->ignore

  state
}
