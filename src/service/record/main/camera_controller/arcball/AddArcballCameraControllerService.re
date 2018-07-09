open StateDataMainType;

let handleAddComponent =
  (. cameraController, gameObjectUid: int, {gameObjectMap} as record) => {
    ...record,
    gameObjectMap:
      AddComponentService.addComponentToGameObjectMap(
        cameraController,
        gameObjectUid,
        gameObjectMap,
      ),
  };