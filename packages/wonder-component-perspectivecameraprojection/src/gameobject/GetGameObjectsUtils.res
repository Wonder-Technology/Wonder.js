open StateType

let get = ({gameObjectMap}, cameraProjection) =>
  switch gameObjectMap->WonderCommonlib.ImmutableSparseMap.get(cameraProjection) {
  | None => []
  | Some(gameObject) => [gameObject->GameObjectTypeConvertUtils.intToGameObject]
  }
