open CameraControllerType;

open CameraControllerStateSystem;

let handleAddComponent =
  [@bs]
  (
    (cameraController: cameraController, gameObjectUid: int, state: StateDataType.state) => {
      let cameraControllerData = getCameraControllerData(state);
      ComponentSystem.addComponentToGameObjectMap(
        cameraController,
        gameObjectUid,
        cameraControllerData.gameObjectMap
      )
      |> ignore;
      state
    }
  );