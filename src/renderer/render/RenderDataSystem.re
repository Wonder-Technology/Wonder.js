/* open StateDataType; */

/* let setToStateRenderData = (flags:jobFlags, state: StateDataType.state, setFunc) => setFunc(flags, state); */

let getCameraData = (state: StateDataType.state) => {
  let currentCameraController = CameraControllerSystem.getCurrentCameraController(state);
  /* todo optimize: remove CameraController->worldToCameraMatrixCacheMap? */
  {
    vMatrix: CameraControllerSystem.getWorldToCameraMatrix(currentCameraController, state),
    pMatrix: CameraControllerSystem.getPMatrix(currentCameraController, state)
  }
};