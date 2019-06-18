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

let unsafeGetFlyCameraControllerPhi = (cameraController, state) =>
  state.flyCameraControllerRecord |> unsafeGetPhi(cameraController);

let setFlyCameraControllerPhi = (cameraController, value: float, state) => {
  ...state,
  flyCameraControllerRecord:
    setPhi(cameraController, value, state.flyCameraControllerRecord),
};

let unsafeGetFlyCameraControllerTheta = (cameraController, state) =>
  state.flyCameraControllerRecord |> unsafeGetTheta(cameraController);

let setFlyCameraControllerTheta = (cameraController, value: float, state) => {
  ...state,
  flyCameraControllerRecord:
    setTheta(cameraController, value, state.flyCameraControllerRecord),
};

let unsafeGetFlyCameraControllerDirectionArray = (cameraController, state) =>
  state.flyCameraControllerRecord |> unsafeGetDirectionArray(cameraController);

let hasFlyCameraControllerDirection = (cameraController, state) =>
  state.flyCameraControllerRecord |> hasDirection(cameraController);

let setFlyCameraControllerDirectionArray =
    (cameraController, directionArray, state) => {
  ...state,
  flyCameraControllerRecord:
    setDirectionArray(
      cameraController,
      directionArray,
      state.flyCameraControllerRecord,
    ),
};

let bindFlyCameraControllerEvent = (cameraController, state) =>
  EventFlyCameraControllerMainService.bindEvent(cameraController, state);

let unbindFlyCameraControllerEvent = (cameraController, state) =>
  EventFlyCameraControllerMainService.unbindEvent(cameraController, state);

let unbindFlyCameraControllerPointScaleEvent = (cameraController, state) =>
  EventFlyCameraControllerMainService.unbindPointScaleEvent(
    cameraController,
    state,
  );

let isBindFlyCameraControllerEvent = (cameraController, state) =>
  EventFlyCameraControllerMainService.isBindEvent(cameraController, state);