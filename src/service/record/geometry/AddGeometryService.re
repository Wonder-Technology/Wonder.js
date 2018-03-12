open BoxGeometryType;

let handleAddComponent =
  [@bs]
  (
    (geometry, gameObjectUid: int, {gameObjectMap} as record) => {
      ...record,
      gameObjectMap:
        AddComponentService.addComponentToGameObjectMap(geometry, gameObjectUid, gameObjectMap)
    }
  );