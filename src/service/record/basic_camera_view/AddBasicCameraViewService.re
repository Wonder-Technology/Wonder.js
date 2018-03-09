open BasicCameraViewType;

let handleAddComponent =
  [@bs]
  (
    (cameraView, gameObjectUid: int, {gameObjectMap} as record) => {
      ...record,
      gameObjectMap:
        ComponentSystem.addComponentToGameObjectMap(cameraView, gameObjectUid, gameObjectMap)
    }
  );