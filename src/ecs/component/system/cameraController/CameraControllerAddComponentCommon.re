open CameraControllerType;

open CameraControllerStateCommon;

let handleAddComponent =
  [@bs]
  (
    (cameraController: cameraController, gameObjectUid: int, state: StateDataType.state) => {
      let {gameObjectMap} as data = getCameraControllerData(state);
      {
        ...state,
        cameraControllerData: {
          ...data,
          gameObjectMap:
            ComponentSystem.addComponentToGameObjectMap(
              cameraController,
              gameObjectUid,
              gameObjectMap
            )
        }
      }
    }
  );