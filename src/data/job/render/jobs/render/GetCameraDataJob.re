open StateDataType;

open RenderDataType;

open CameraControllerType;

let _getCameraData = (state: StateDataType.state) =>
  switch (CameraControllerAdmin.getCurrentCameraController(state)) {
  | None => None
  | Some(currentCameraController) =>
    let transform =
      GetComponentUtils.getTransformFromCameraController(currentCameraController, state);
    /* RenderDataSystem.isFirstRender(state) ?
       Some({
         vMatrix:
           CacheType.New(CameraControllerSystem.getWorldToCameraMatrixByTransform(transform, state)),
         pMatrix: CacheType.New(CameraControllerSystem.getPMatrix(currentCameraController, state))
       }) :
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
       }) */
    Some({
      vMatrix: CameraControllerAdmin.getWorldToCameraMatrix(transform, state),
      pMatrix: CameraControllerAdmin.unsafeGetPMatrix(currentCameraController, state),
      normalMatrix: CameraControllerAdmin.getNormalMatrix(transform, state),
      position: CameraControllerAdmin.getPosition(transform, state)
    })
  };

let execJob = (configData, gl, state) =>
  RenderDataSystem.setCameraData(_getCameraData(state), state);