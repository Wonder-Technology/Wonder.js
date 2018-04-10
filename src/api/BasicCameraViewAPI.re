open StateDataMainType;

open TransformType;

open BasicCameraViewType;

open DisposeBasicCameraViewService;

open GameObjectBasicCameraViewService;

let createBasicCameraView = (state) => {
  let (basicCameraViewRecord, index) =
    CreateBasicCameraViewService.create(state.basicCameraViewRecord);
  ({...state, basicCameraViewRecord}, index)
};

let unsafeGetGameObjectBasicCameraView = (cameraView, state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              cameraView,
              isAlive,
              state.basicCameraViewRecord
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  unsafeGetGameObject(cameraView, state.basicCameraViewRecord)
};

let getBasicCameraViewWorldToCameraMatrix = (cameraView, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              cameraView,
              isAlive,
              state.basicCameraViewRecord
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  let {localToWorldMatrices, localToWorldMatrixCacheMap} =
    RecordTransformMainService.getRecord(state);
  let (localToWorldMatrix, _) =
    ModelMatrixTransformService.getLocalToWorldMatrixTypeArray(
      GetComponentGameObjectService.unsafeGetTransformComponent(
        unsafeGetGameObject(cameraView, state.basicCameraViewRecord),
        state.gameObjectRecord
      ),
      localToWorldMatrices,
      localToWorldMatrixCacheMap
    );
  VMatrixService.getWorldToCameraMatrix(localToWorldMatrix)
};