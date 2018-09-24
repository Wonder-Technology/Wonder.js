open MaterialType;

open LightMaterialType;

let getGameObjects = (material, {gameObjectsMap}) =>
  GameObjectsMapService.getGameObjects(material, gameObjectsMap);

let unsafeGetGameObjects = (material, {gameObjectsMap}) =>
  GameObjectsMapService.unsafeGetGameObjects(material, gameObjectsMap);