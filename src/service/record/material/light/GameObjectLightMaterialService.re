open MaterialType;

open LightMaterialType;

let getGameObject = (material, {gameObjectMap}) =>
  GameObjectMapService.getGameObject(material, gameObjectMap);

let unsafeGetGameObject = (material, {gameObjectMap}) =>
  GameObjectMapService.unsafeGetGameObject(material, gameObjectMap);