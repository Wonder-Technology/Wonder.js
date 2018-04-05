
open PerspectiveCameraProjectionType;

let handleAddComponent =
  [@bs]
  (
    (cameraProjection, gameObjectUid: int, {gameObjectMap} as record) => {
      ...record,
      gameObjectMap:
        AddComponentService.addComponentToGameObjectMap(cameraProjection, gameObjectUid, gameObjectMap)
    }
  );