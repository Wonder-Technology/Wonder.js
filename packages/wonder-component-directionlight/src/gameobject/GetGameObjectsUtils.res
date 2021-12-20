open StateType

let get = ({gameObjectMap}, light) =>
  switch gameObjectMap->WonderCommonlib.MutableSparseMap.get(light) {
  | None => []
  | Some(gameObject) => [gameObject->GameObjectTypeConvertUtils.intToGameObject]
  }
