open StateDataMainType;

open IndexComponentService;

let getGameObject = (script, {gameObjectMap}: scriptRecord) =>
  GameObjectMapService.getGameObject(script, gameObjectMap);

let unsafeGetGameObject = (script, {gameObjectMap}: scriptRecord) =>
  GameObjectMapService.unsafeGetGameObject(script, gameObjectMap);