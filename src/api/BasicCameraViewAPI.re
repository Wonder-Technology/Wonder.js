open StateDataMainType;

open TransformType;

open BasicCameraViewType;

open DisposeBasicCameraViewService;

open GameObjectBasicCameraViewService;

let createBasicCameraView = state => {
  let (basicCameraViewRecord, index) =
    CreateBasicCameraViewService.create(state.basicCameraViewRecord);
  state.basicCameraViewRecord = basicCameraViewRecord;
  (state, index);
};

let unsafeGetBasicCameraViewGameObject = (cameraView, state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              cameraView,
              isAlive,
              state.basicCameraViewRecord,
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  unsafeGetGameObject(cameraView, state.basicCameraViewRecord);
};

let getBasicCameraViewWorldToCameraMatrix =
    (cameraView, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              cameraView,
              isAlive,
              state.basicCameraViewRecord,
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );

  ViewMatrixBasicCameraViewMainService.getBasicCameraViewWorldToCameraMatrix(
    cameraView,
    state,
  );
};

let isActiveBasicCameraView = (cameraView, state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              cameraView,
              isAlive,
              state.basicCameraViewRecord,
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );

  ActiveBasicCameraViewService.isActive(
    cameraView,
    state.basicCameraViewRecord,
  );
};

let activeBasicCameraView = (cameraView, state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              cameraView,
              isAlive,
              state.basicCameraViewRecord,
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );

  {
    ...state,
    basicCameraViewRecord:
      ActiveBasicCameraViewService.active(
        cameraView,
        state.basicCameraViewRecord,
      ),
  };
};

let unactiveBasicCameraView = (cameraView, state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              cameraView,
              isAlive,
              state.basicCameraViewRecord,
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );

  {
    ...state,
    basicCameraViewRecord:
      ActiveBasicCameraViewService.unactive(
        cameraView,
        state.basicCameraViewRecord,
      ),
  };
};

let setActiveBasicCameraView = (cameraView, isActive, state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              cameraView,
              isAlive,
              state.basicCameraViewRecord,
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );

  {
    ...state,
    basicCameraViewRecord:
      ActiveBasicCameraViewService.setActive(
        cameraView,
        isActive,
        state.basicCameraViewRecord,
      ),
  };
};

let getActiveBasicCameraView = state =>
  ActiveBasicCameraViewService.getActiveCameraView(
    state.basicCameraViewRecord,
  );