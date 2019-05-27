open StateDataMainType;

open GameObjectFlyCameraControllerService;

open OperateFlyCameraControllerService;

open DisposeFlyCameraControllerMainService;

let createFlyCameraController = state =>
  CreateFlyCameraControllerMainService.create(. state);

let unsafeGetFlyCameraControllerGameObject = (cameraController, state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              cameraController,
              isAlive,
              state.flyCameraControllerRecord,
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );

  unsafeGetGameObject(cameraController, state.flyCameraControllerRecord);
};

let unsafeGetFlyCameraControllerMoveSpeedX = (cameraController, state) =>
  state.flyCameraControllerRecord |> unsafeGetMoveSpeedX(cameraController);

let setFlyCameraControllerMoveSpeedX = (cameraController, value: float, state) => {
  ...state,
  flyCameraControllerRecord:
    setMoveSpeedX(cameraController, value, state.flyCameraControllerRecord),
};

let unsafeGetFlyCameraControllerMoveSpeedY = (cameraController, state) =>
  state.flyCameraControllerRecord |> unsafeGetMoveSpeedY(cameraController);

let setFlyCameraControllerMoveSpeedY = (cameraController, value: float, state) => {
  ...state,
  flyCameraControllerRecord:
    setMoveSpeedY(cameraController, value, state.flyCameraControllerRecord),
};

let unsafeGetFlyCameraControllerRotateSpeed = (cameraController, state) =>
  state.flyCameraControllerRecord |> unsafeGetRotateSpeed(cameraController);

let setFlyCameraControllerRotateSpeed =
    (cameraController, value: float, state) => {
  ...state,
  flyCameraControllerRecord:
    setRotateSpeed(cameraController, value, state.flyCameraControllerRecord),
};

let bindFlyCameraControllerEvent = (cameraController, state) =>
  EventFlyCameraControllerMainService.bindEvent(cameraController, state);

let unbindFlyCameraControllerEvent = (cameraController, state) =>
  EventFlyCameraControllerMainService.unbindEvent(
    cameraController,
    state,
  );

let isBindFlyCameraControllerEvent = (cameraController, state) =>
  EventFlyCameraControllerMainService.isBindEvent(
    cameraController,
    state,
  );