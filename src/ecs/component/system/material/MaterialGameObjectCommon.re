open MaterialType;

let getGameObject = (material, gameObjectMap) =>
  ComponentSystem.getComponentGameObject(material, gameObjectMap);

let unsafeGetGameObject = (material, gameObjectMap) =>
  ComponentSystem.unsafeGetComponentGameObject(material, gameObjectMap);