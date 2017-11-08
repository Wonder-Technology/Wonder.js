open StateDataType;

open RenderDataType;

let _getCameraData = (state: StateDataType.state) =>
  switch (CameraControllerSystem.getCurrentCameraController(state)) {
  | None => None
  | Some(currentCameraController) =>
    Some({
      vMatrix: CameraControllerSystem.getWorldToCameraMatrix(currentCameraController, state),
      pMatrix: CacheType.New(CameraControllerSystem.getPMatrix(currentCameraController, state))
    })
  };

let getJob = (configData, gl, state) => {
  RenderDataSystem.setCameraData(_getCameraData(state), state);
  state
};