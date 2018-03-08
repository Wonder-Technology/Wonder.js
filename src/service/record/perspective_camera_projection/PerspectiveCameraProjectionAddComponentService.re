
open PerspectiveCameraProjectionType;

let handleAddComponent =
  [@bs]
  (
    (cameraProjection, gameObjectUid: int, {gameObjectMap} as record) => {
      ...record,
      gameObjectMap:
        ComponentSystem.addComponentToGameObjectMap(cameraProjection, gameObjectUid, gameObjectMap)
    }
  );