open DirectionLightType;

let handleAddComponent =
  (. light, gameObjectUid: int, {gameObjectMap} as record) => {
    ...record,
    gameObjectMap:
      AddComponentService.addComponentToGameObjectMap(
        light,
        gameObjectUid,
        gameObjectMap,
      ),
  };