open StateDataMainType;

let handleAddComponent =
  (.
    cameraController,
    gameObjectUid: int,
    {gameObjectMap} as record: flyCameraControllerRecord,
  ) => (
    {
      ...record,
      gameObjectMap:
        AddComponentService.addComponentToGameObjectMap(
          cameraController,
          gameObjectUid,
          gameObjectMap,
        ),
    }: flyCameraControllerRecord
  );