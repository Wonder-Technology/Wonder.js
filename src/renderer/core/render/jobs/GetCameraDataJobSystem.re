open StateDataType;

open RenderDataType;

let _getCameraData = (state: StateDataType.state) =>
  switch (CameraControllerSystem.getCurrentCameraController(state)) {
  | None => None
  | Some(currentCameraController) =>
    /* todo optimize: remove CameraController->worldToCameraMatrixCacheMap? */
    Some({
      vMatrix: CameraControllerSystem.getWorldToCameraMatrix(currentCameraController, state),
      pMatrix: CameraControllerSystem.getPMatrix(currentCameraController, state)
    })
  };

let getJob = (configData, gl, state) => {
  RenderDataSystem.setCameraData(_getCameraData(state), state);
  state
};