open StateDataMainType;

let getGameObject = (cameraController, {gameObjectMap}) =>
  GameObjectMapService.getGameObject(cameraController, gameObjectMap);

let unsafeGetGameObject = (cameraController, {gameObjectMap}) =>
  GameObjectMapService.unsafeGetGameObject(cameraController, gameObjectMap);