open StateDataType;

open RenderDataType;

let _getCameraData = (state: StateDataType.state) => {
  let currentCameraController = CameraControllerSystem.getCurrentCameraController(state);
  /* todo optimize: remove CameraController->worldToCameraMatrixCacheMap? */
  {
    vMatrix: CameraControllerSystem.getWorldToCameraMatrix(currentCameraController, state),
    pMatrix: CameraControllerSystem.getPMatrix(currentCameraController, state)
  }
};

let getJob = (configData, gl, state) => {
  RenderDataSystem.setCameraData(_getCameraData(state), state);
  state
};