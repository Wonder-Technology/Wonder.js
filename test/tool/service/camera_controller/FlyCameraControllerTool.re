open StateDataMainType;

let createGameObject = state => {
  open GameObjectAPI;

  let (state, cameraController) =
    FlyCameraControllerAPI.createFlyCameraController(state);

  let (
    state,
    gameObject,
    transform,
    (basicCameraView, perspectiveCameraProjection),
  ) =
    CameraTool.createCameraGameObject(state);

  let state =
    addGameObjectFlyCameraControllerComponent(
      gameObject,
      cameraController,
      state,
    );

  (
    state,
    gameObject,
    transform,
    (cameraController, basicCameraView, perspectiveCameraProjection),
  );
};

let unsafeGetEulerAngleDiff = (cameraController, state) =>
  state.flyCameraControllerRecord
  |> OperateFlyCameraControllerService.unsafeGetEulerAngleDiff(
       cameraController,
     );

let setEulerAngleDiff = (cameraController, value, state) => {
  ...state,
  flyCameraControllerRecord:
    OperateFlyCameraControllerService.setEulerAngleDiff(
      cameraController,
      value,
      state.flyCameraControllerRecord,
    ),
};

let unsafeGetTranslationDiff = (cameraController, state) =>
  state.flyCameraControllerRecord
  |> OperateFlyCameraControllerService.unsafeGetTranslationDiff(
       cameraController,
     );

let setTranslationDiff = (cameraController, value, state) => {
  ...state,
  flyCameraControllerRecord:
    OperateFlyCameraControllerService.setTranslationDiff(
      cameraController,
      value,
      state.flyCameraControllerRecord,
    ),
};

let getLocalEulerAngleX = (transformComponent, state) =>
  state.flyCameraControllerRecord
  |> OperateFlyCameraControllerService.getLocalEulerAngleX(transformComponent);

let getLocalEulerAngleY = (transformComponent, state) =>
  state.flyCameraControllerRecord
  |> OperateFlyCameraControllerService.getLocalEulerAngleY(transformComponent);

let getLocalEulerAngleZ = (transformComponent, state) =>
  state.flyCameraControllerRecord
  |> OperateFlyCameraControllerService.getLocalEulerAngleZ(transformComponent);

let setLocalEulerAngleX = (transformComponent, value, state) => {
  ...state,
  flyCameraControllerRecord:
    OperateFlyCameraControllerService.setLocalEulerAngleX(
      transformComponent,
      value,
      state.flyCameraControllerRecord,
    ),
};

let setLocalEulerAngleY = (transformComponent, value, state) => {
  ...state,
  flyCameraControllerRecord:
    OperateFlyCameraControllerService.setLocalEulerAngleY(
      transformComponent,
      value,
      state.flyCameraControllerRecord,
    ),
};

let setLocalEulerAngleZ = (transformComponent, value, state) => {
  ...state,
  flyCameraControllerRecord:
    OperateFlyCameraControllerService.setLocalEulerAngleZ(
      transformComponent,
      value,
      state.flyCameraControllerRecord,
    ),
};

let setFlyCameraControllerData = (cameraController, state) => {
  open FlyCameraControllerAPI;

  let moveSpeed = 0.1;
  let rotateSpeed = 0.3;
  let wheelSpeed = 0.4;

  let state =
    state
    |> setFlyCameraControllerMoveSpeed(cameraController, moveSpeed)
    |> setFlyCameraControllerRotateSpeed(cameraController, rotateSpeed)
    |> setFlyCameraControllerWheelSpeed(cameraController, wheelSpeed);

  (state, (moveSpeed, rotateSpeed, wheelSpeed));
};

let addPointDragStartEventHandleFunc =
    (cameraController, handleFunc, {flyCameraControllerRecord} as state) => {
  ...state,
  flyCameraControllerRecord:
    EventFlyCameraControllerMainService._addPointDragStartEventHandleFunc(
      cameraController,
      handleFunc,
      flyCameraControllerRecord,
    ),
};

let addPointDragDropEventHandleFunc =
    (cameraController, handleFunc, {flyCameraControllerRecord} as state) => {
  ...state,
  flyCameraControllerRecord:
    EventFlyCameraControllerMainService._addPointDragDropEventHandleFunc(
      cameraController,
      handleFunc,
      flyCameraControllerRecord,
    ),
};

let addPointDragOverEventHandleFunc =
    (cameraController, handleFunc, {flyCameraControllerRecord} as state) => {
  ...state,
  flyCameraControllerRecord:
    EventFlyCameraControllerMainService._addPointDragOverEventHandleFunc(
      cameraController,
      handleFunc,
      flyCameraControllerRecord,
    ),
};

let addPointScaleEventHandleFunc =
    (cameraController, handleFunc, {flyCameraControllerRecord} as state) => {
  ...state,
  flyCameraControllerRecord:
    EventFlyCameraControllerMainService._addPointScaleEventHandleFunc(
      cameraController,
      handleFunc,
      flyCameraControllerRecord,
    ),
};

let addKeydownEventHandleFunc =
    (cameraController, handleFunc, {flyCameraControllerRecord} as state) => {
  ...state,
  flyCameraControllerRecord:
    EventFlyCameraControllerMainService._addKeydownEventHandleFunc(
      cameraController,
      handleFunc,
      flyCameraControllerRecord,
    ),
};