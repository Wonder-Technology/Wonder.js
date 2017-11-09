open StateDataType;

open RenderDataType;

let _getCameraData = (state: StateDataType.state) =>
  switch (CameraControllerSystem.getCurrentCameraController(state)) {
  | None => None
  | Some(currentCameraController) =>
    let transform = CameraControllerSystem.getTransform(currentCameraController, state);
    Some({
      vMatrix:
        TransformSystem.isDirty(transform, state) ?
          CacheType.New(
            CameraControllerSystem.getWorldToCameraMatrixByTransform(transform, state)
          ) :
          CacheType.Cache,
      pMatrix:
        CameraControllerSystem.isDirty(currentCameraController, state) ?
          CacheType.New(CameraControllerSystem.getPMatrix(currentCameraController, state)) :
          CacheType.Cache
    })
  };

let getJob = (configData, gl, state) => {
  RenderDataSystem.setCameraData(_getCameraData(state), state);
  state
};