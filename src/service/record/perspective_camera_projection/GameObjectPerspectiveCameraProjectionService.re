open PerspectiveCameraProjectionType;

let getGameObject = (cameraProjection, {gameObjectMap}) =>
  GameObjectMapService.getGameObject(cameraProjection, gameObjectMap);

let unsafeGetGameObject = (cameraProjection, {gameObjectMap}) =>
  GameObjectMapService.unsafeGetGameObject(cameraProjection, gameObjectMap);