open StateDataMainType;

open TransformType;

let getBasicCameraViewWorldToCameraMatrix =
    (cameraView, state: StateDataMainType.state) => {
  let {localToWorldMatrices, localToWorldMatrixCacheMap} =
    RecordTransformMainService.getRecord(state);
  ModelMatrixTransformService.getLocalToWorldMatrixTypeArray(.
    GetComponentGameObjectService.unsafeGetTransformComponent(
      GameObjectBasicCameraViewService.unsafeGetGameObject(
        cameraView,
        state.basicCameraViewRecord,
      ),
      state.gameObjectRecord,
    ),
    localToWorldMatrices,
    localToWorldMatrixCacheMap,
  )
  |> VMatrixService.getWorldToCameraMatrix;
};