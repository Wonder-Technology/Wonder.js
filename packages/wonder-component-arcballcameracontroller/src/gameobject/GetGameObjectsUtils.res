open StateType

let get = ({gameObjectMap}, cameraController) =>
  switch gameObjectMap->WonderCommonlib.ImmutableSparseMap.get(cameraController) {
  | None => []
  | Some(gameObject) => [gameObject->GameObjectTypeConvertUtils.intToGameObject]
  }
