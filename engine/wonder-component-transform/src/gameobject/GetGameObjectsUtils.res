open StateType

let get = ({gameObjectMap}, transform) =>
  switch gameObjectMap->WonderCommonlib.MutableSparseMap.get(transform) {
  | None => []
  | Some(gameObject) => [gameObject->GameObjectTypeConvertUtils.intToGameObject]
  }
