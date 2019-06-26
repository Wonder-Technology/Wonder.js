open AllInstanceType;

open ObjectInstanceType;

let getGameObject = (objectInstance: objectInstance, {gameObjectMap}) =>
  GameObjectMapService.getGameObject(objectInstance, gameObjectMap);

let unsafeGetGameObject = (objectInstance: objectInstance, {gameObjectMap}) =>
  GameObjectMapService.unsafeGetGameObject(objectInstance, gameObjectMap);