open AllInstanceType;

open SourceInstanceType;

let getGameObject = (sourceInstance: sourceInstance, {gameObjectMap}) =>
  GameObjectMapService.getGameObject(sourceInstance, gameObjectMap);

let unsafeGetGameObject = (sourceInstance: sourceInstance, {gameObjectMap}) =>
  GameObjectMapService.unsafeGetGameObject(sourceInstance, gameObjectMap);