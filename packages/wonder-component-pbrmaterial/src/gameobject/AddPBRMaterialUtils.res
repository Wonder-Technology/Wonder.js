open StateType

let add = ({gameObjectsMap, gameObjectPBRMaterialMap} as state, gameObject, material) => {
  let gameObject = gameObject->GameObjectTypeConvertUtils.gameObjectToInt

  gameObjectsMap->WonderCommonlib.ArrayMapUtils.addValue(material, gameObject)->ignore

  gameObjectPBRMaterialMap->WonderCommonlib.MutableSparseMap.set(gameObject, material)->ignore

  state
}
