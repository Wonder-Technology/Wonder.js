open GeometryType;

open IndexComponentService;

let getGameObjects = (geometry, {gameObjectsMap}) =>
  GameObjectsMapService.getGameObjects(geometry, gameObjectsMap);

let unsafeGetGameObjects = (geometry, {gameObjectsMap}) =>
  GameObjectsMapService.unsafeGetGameObjects(geometry, gameObjectsMap);