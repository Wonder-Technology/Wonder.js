open StateDataMainType;

let getGameObject =
    (cameraController, {gameObjectMap}: arcballCameraControllerRecord) =>
  GameObjectMapService.getGameObject(cameraController, gameObjectMap);

let unsafeGetGameObject =
    (cameraController, {gameObjectMap}: arcballCameraControllerRecord) =>
  GameObjectMapService.unsafeGetGameObject(cameraController, gameObjectMap);