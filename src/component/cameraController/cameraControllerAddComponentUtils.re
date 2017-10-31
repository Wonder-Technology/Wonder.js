open CameraControllerType;

open CameraControllerStateUtils;

let handleAddComponent = (cameraController: cameraController, gameObjectUId: string, state: StateDataType.state) => {
  let cameraControllerData = getCameraControllerData(state);
  ComponentSystem.addComponentToGameObjectMap(
    cameraController,
    gameObjectUId,
    cameraControllerData.gameObjectMap
  )
  |> ignore;
  state
};
