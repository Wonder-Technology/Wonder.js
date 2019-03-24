open StateDataMainType;

let handleAddComponent =
  (.
    cameraController,
    gameObjectUid: int,
    {gameObjectMap} as record: arcballCameraControllerRecord,
  ) => (
    {
      ...record,
      gameObjectMap:
        AddComponentService.addComponentToGameObjectMap(
          cameraController,
          gameObjectUid,
          gameObjectMap,
        ),
    }: arcballCameraControllerRecord
  );