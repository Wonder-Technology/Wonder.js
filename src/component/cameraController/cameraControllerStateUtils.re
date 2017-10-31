open CameraControllerType;

let getCameraControllerData = (state: StateDataType.state) => state.cameraControllerData;

let getPerspectiveCameraDataFromCameraControllerData = (cameraControllerData) =>
  cameraControllerData.perspectiveCameraData;

let getPerspectiveCameraData = (state: StateDataType.state) =>
  state |> getCameraControllerData |> getPerspectiveCameraDataFromCameraControllerData;