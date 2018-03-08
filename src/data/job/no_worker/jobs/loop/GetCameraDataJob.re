open StateDataType;

open RenderDataType;

let _getCameraData =
    (
      {basicCameraViewRecord, perspectiveCameraProjectionRecord, sceneRecord, gameObjectRecord} as state
    ) =>
  switch (SceneCameraService.getCurrentCameraGameObject(basicCameraViewRecord, sceneRecord)) {
  | None => None
  | Some(currentCameraGameObject) =>
    let transform =
      GetComponentUtils.getTransformFromBasicCameraView(currentCameraGameObject, state);
    /* RenderDataSystem.isFirstRender(state) ?
       Some({
         vMatrix:
           CacheType.New(BasicCameraViewSystem.getWorldToCameraMatrixByTransform(transform, state)),
         pMatrix: CacheType.New(BasicCameraViewSystem.getPMatrix(currentBasicCameraView, state))
       }) :
       Some({
         vMatrix:
           TransformSystem.isDirty(transform, state) ?
             CacheType.New(
               BasicCameraViewSystem.getWorldToCameraMatrixByTransform(transform, state)
             ) :
             CacheType.Cache,
         pMatrix:
           BasicCameraViewSystem.isDirty(currentBasicCameraView, state) ?
             CacheType.New(BasicCameraViewSystem.getPMatrix(currentBasicCameraView, state)) :
             CacheType.Cache
       }) */
    Some({
      vMatrix:
        VMatrixService.getWorldToCameraMatrix(
          TransformSystem.getLocalToWorldMatrixTypeArray(transform, state)
        ),
      pMatrix:
        PMatrixService.unsafeGetPMatrix(
          GameObjectGetComponentService.unsafeGetPerspectiveCameraProjectionComponent(
            currentCameraGameObject,
            gameObjectRecord
          ),
          perspectiveCameraProjectionRecord.pMatrixMap
        ),
      position: TransformSystem.getPositionTuple(transform, state)
    })
  };

let execJob = (_, _, state) => RenderDataSystem.setCameraData(_getCameraData(state), state);