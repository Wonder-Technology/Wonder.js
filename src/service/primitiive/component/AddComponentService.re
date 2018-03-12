open ComponentType;

let addComponentToGameObjectMap = (component, gameObjectUid: int, gameObjectMap) =>
  WonderCommonlib.SparseMapSystem.set(component, gameObjectUid, gameObjectMap);