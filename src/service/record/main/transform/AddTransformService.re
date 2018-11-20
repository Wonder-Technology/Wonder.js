open TransformType;

let handleAddComponent =
  (. transform: transform, gameObjectUid: int, {gameObjectMap} as record) => {
    ...record,
    isGameObjectMapForDeepCopy: true,
    gameObjectMap:
      AddComponentService.addComponentToGameObjectMap(
        transform,
        gameObjectUid,
        gameObjectMap,
      ),
  };