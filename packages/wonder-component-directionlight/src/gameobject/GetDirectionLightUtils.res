open StateType

let get = ({gameObjectDirectionLightMap}, gameObject) => {
  gameObjectDirectionLightMap->WonderCommonlib.MutableSparseMap.getNullable(
    gameObject->GameObjectTypeConvertUtils.gameObjectToInt,
  )
}
