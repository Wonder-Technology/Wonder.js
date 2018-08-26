open GeometryType;

let handleAddComponent =
  (. geometry, gameObjectUid: int, {gameObjectsMap} as record) => {
    ...record,
    gameObjectsMap:
      AddComponentService.addSharableComponentToGameObjectsMap(
        geometry,
        gameObjectUid,
        gameObjectsMap,
      ),
  };