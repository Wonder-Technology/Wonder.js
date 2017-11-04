let setToStateRenderData = (setFunc, state: StateDataType.state) => setFunc(state);

let getCameraData = (state: StateDataType.state) => {
  let currentCameraController = CameraControllerSystem.getCurrentCameraController(state);
  /* todo optimize: remove CameraController->worldToCameraMatrixCacheMap? */
  {
    vMatrix: CameraControllerSystem.getWorldToCameraMatrix(currentCameraController, state),
    pMatrix: CameraControllerSystem.getPMatrix(currentCameraController, state)
  }
};