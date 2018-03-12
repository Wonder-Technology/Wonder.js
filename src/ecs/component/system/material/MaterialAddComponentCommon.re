open GameObjectType;

open MaterialType;

let handleAddComponent = (material, gameObjectUid: int, gameObjectMap) =>
  AddComponentService.addComponentToGameObjectMap(material, gameObjectUid, gameObjectMap);