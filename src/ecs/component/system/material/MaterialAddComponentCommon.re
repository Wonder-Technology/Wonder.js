open GameObjectType;

open MaterialType;

let handleAddComponent = (material, gameObjectUid: int, gameObjectMap) =>
  ComponentSystem.addComponentToGameObjectMap(material, gameObjectUid, gameObjectMap);