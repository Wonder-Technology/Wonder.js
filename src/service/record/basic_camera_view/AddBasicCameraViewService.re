open BasicCameraViewType;

let handleAddComponent =
  [@bs]
  (
    (cameraView, gameObjectUid: int, {gameObjectMap} as record) => {
      ...record,
      gameObjectMap:
        AddComponentService.addComponentToGameObjectMap(cameraView, gameObjectUid, gameObjectMap)
    }
  );