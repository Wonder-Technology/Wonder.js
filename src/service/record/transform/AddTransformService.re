open TransformType;

let handleAddComponent =
  [@bs]
  (
    (transform: transform, gameObjectUid: int, {gameObjectMap} as record) => {
      ...record,
      gameObjectMap:
        AddComponentService.addComponentToGameObjectMap(transform, gameObjectUid, gameObjectMap)
    }
  );