open MaterialType;

open BasicMaterialType;

let getGameObject = (material, {gameObjectMap}) =>
  GameObjectMapService.getGameObject(material, gameObjectMap);

let unsafeGetGameObject = (material, {gameObjectMap}) =>
  GameObjectMapService.unsafeGetGameObject(material, gameObjectMap);