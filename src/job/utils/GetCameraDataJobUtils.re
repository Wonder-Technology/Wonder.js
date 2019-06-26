open StateDataMainType;

open AllRenderCameraType;

let getCameraData =
    (
      {
        basicCameraViewRecord,
        perspectiveCameraProjectionRecord,
        globalTempRecord,
        gameObjectRecord,
      } as state,
    ) =>
  switch (
    ActiveBasicCameraViewService.getActiveCameraView(basicCameraViewRecord)
  ) {
  | None => None
  | Some(activeCameraView) =>
    let activeCameraViewGameObject =
      activeCameraView
      |> GameObjectBasicCameraViewService.unsafeGetGameObject(
           _,
           basicCameraViewRecord,
         );
    let transformRecord = state |> RecordTransformMainService.getRecord;
    let transform =
      GetComponentGameObjectService.unsafeGetTransformComponent(
        activeCameraViewGameObject,
        gameObjectRecord,
      );
    Some({
      vMatrix:
        VMatrixService.getWorldToCameraMatrix(
          UpdateTransformMainService.updateAndGetLocalToWorldMatrixTypeArray(
            transform,
            globalTempRecord,
            transformRecord,
          ),
        ),
      pMatrix:
        PMatrixService.unsafeGetPMatrix(
          GetComponentGameObjectService.unsafeGetPerspectiveCameraProjectionComponent(
            activeCameraViewGameObject,
            gameObjectRecord,
          ),
          perspectiveCameraProjectionRecord.pMatrixMap,
        ),
      position:
        UpdateTransformMainService.updateAndGetPositionTuple(
          transform,
          globalTempRecord,
          transformRecord,
        ),
    });
  };