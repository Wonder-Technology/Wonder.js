open StateType

let get = ({gameObjectMap}, cameraView) =>
  switch gameObjectMap->WonderCommonlib.ImmutableSparseMap.get(cameraView) {
  | None => []
  | Some(gameObject) => [gameObject->GameObjectTypeConvertUtils.intToGameObject]
  }
