open StateDataMainType;

let getGameObject =
    (cameraController, {gameObjectMap}: flyCameraControllerRecord) =>
  GameObjectMapService.getGameObject(cameraController, gameObjectMap);

let unsafeGetGameObject =
    (cameraController, {gameObjectMap}: flyCameraControllerRecord) =>
  GameObjectMapService.unsafeGetGameObject(cameraController, gameObjectMap);