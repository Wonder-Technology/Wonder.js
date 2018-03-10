open StateDataType;

open RenderDataType;

let _getCameraData =
    (
      {
        basicCameraViewRecord,
        perspectiveCameraProjectionRecord,
        sceneRecord,
        transformRecord,
        globalTempRecord,
        gameObjectRecord
      } as state
    ) =>
  switch (CameraSceneService.getCurrentCameraGameObject(basicCameraViewRecord, sceneRecord)) {
  | None => None
  | Some(currentCameraGameObject) =>
    let transform =
      GetComponentGameObjectService.unsafeGetTransformComponent(
        currentCameraGameObject,
        gameObjectRecord
      );
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
          ModelMatrixTransformService.getLocalToWorldMatrixTypeArray(transform, transformRecord)
        ),
      pMatrix:
        PMatrixService.unsafeGetPMatrix(
          GetComponentGameObjectService.unsafeGetPerspectiveCameraProjectionComponent(
            currentCameraGameObject,
            gameObjectRecord
          ),
          perspectiveCameraProjectionRecord.pMatrixMap
        ),
      position:
        UpdateTransformService.updateAndGetPositionTuple(
          transform,
          globalTempRecord,
          transformRecord
        )
    })
  };

let execJob = (_, _, state) => RenderDataSystem.setCameraData(_getCameraData(state), state);