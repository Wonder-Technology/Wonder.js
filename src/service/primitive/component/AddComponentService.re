open ComponentType;

let addComponentToGameObjectMap = (component, gameObjectUid: int, gameObjectMap) =>
  WonderCommonlib.SparseMapService.set(component, gameObjectUid, gameObjectMap);