open GeometryType;

open IndexComponentService;

let getGameObject = (geometry, {gameObjectMap}) =>
  GameObjectMapService.getGameObject(geometry, gameObjectMap);

let unsafeGetGameObject = (geometry, {gameObjectMap}) =>
  GameObjectMapService.unsafeGetGameObject(geometry, gameObjectMap);