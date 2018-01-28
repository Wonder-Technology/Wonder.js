open GameObjectType;

open MaterialType;

open MaterialStateCommon;

let handleAddComponent = (material, gameObjectUid: int, gameObjectMap) =>
  ComponentSystem.addComponentToGameObjectMap(material, gameObjectUid, gameObjectMap);