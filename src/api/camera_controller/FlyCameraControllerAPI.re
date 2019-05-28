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

let unsafeGetFlyCameraControllerMoveSpeed = (cameraController, state) =>
  state.flyCameraControllerRecord |> unsafeGetMoveSpeed(cameraController);

let setFlyCameraControllerMoveSpeed = (cameraController, value: float, state) => {
  ...state,
  flyCameraControllerRecord:
    setMoveSpeed(cameraController, value, state.flyCameraControllerRecord),
};

let unsafeGetFlyCameraControllerWheelSpeed = (cameraController, state) =>
  state.flyCameraControllerRecord |> unsafeGetWheelSpeed(cameraController);

let setFlyCameraControllerWheelSpeed = (cameraController, value: float, state) => {
  ...state,
  flyCameraControllerRecord:
    setWheelSpeed(cameraController, value, state.flyCameraControllerRecord),
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
  EventFlyCameraControllerMainService.unbindEvent(cameraController, state);

let isBindFlyCameraControllerEvent = (cameraController, state) =>
  EventFlyCameraControllerMainService.isBindEvent(cameraController, state);