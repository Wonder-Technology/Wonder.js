open StateType

let get = ({gameObjectTransformMap}, gameObject) => {
  gameObjectTransformMap->WonderCommonlib.MutableSparseMap.getNullable(
    gameObject->GameObjectTypeConvertUtils.gameObjectToInt,
  )
}
