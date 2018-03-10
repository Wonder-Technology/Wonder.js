open TransformType;

let handleAddComponent =
  [@bs]
  (
    (transform: transform, gameObjectUid: int, {gameObjectMap} as record) => {
      ...record,
      gameObjectMap:
        ComponentSystem.addComponentToGameObjectMap(transform, gameObjectUid, gameObjectMap)
    }
  );