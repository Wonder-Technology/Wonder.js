open StateDataType;

open BasicCameraViewType;

open BasicCameraViewDisposeComponentService;

open BasicCameraViewGameObjectService;

let createBasicCameraView = (state) => {
  let (basicCameraViewRecord, index) =
    BasicCameraViewCreateService.create(state.basicCameraViewRecord);
  ({...state, basicCameraViewRecord}, index)
};

let unsafeGetBasicCameraViewGameObject = (cameraView, state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            ComponentDisposeComponentService.checkComponentShouldAlive(
              cameraView,
              isAlive,
              state.basicCameraViewRecord
            )
          )
        )
      ),
    StateData.stateData.isDebug
  );
  unsafeGetGameObject(cameraView, state.basicCameraViewRecord)
};

let getBasicCameraViewWorldToCameraMatrix = (cameraView, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            ComponentDisposeComponentService.checkComponentShouldAlive(
              cameraView,
              isAlive,
              state.basicCameraViewRecord
            )
          )
        )
      ),
    StateData.stateData.isDebug
  );
  VMatrixService.getWorldToCameraMatrix(
    TransformSystem.getLocalToWorldMatrixTypeArray(
      GameObjectAdmin.unsafeGetTransformComponent(
        unsafeGetGameObject(cameraView, state.basicCameraViewRecord),
        state
      ),
      state
    )
  )
};