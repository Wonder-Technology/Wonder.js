open GeometryType;

let handleAddComponent =
  (. geometry, gameObjectUid: int, {gameObjectMap} as record) => {
    ...record,
    gameObjectMap:
      AddComponentService.addComponentToGameObjectMap(
        geometry,
        gameObjectUid,
        gameObjectMap,
      ),
  };