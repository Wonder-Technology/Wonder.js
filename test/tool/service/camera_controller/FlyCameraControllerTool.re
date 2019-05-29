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

/* let setFlyCameraControllerData = (cameraController, state) => {
     open FlyCameraControllerAPI;

     let distance = 1.6;
     let minDistance = 0.5;
     let phi = 1.7;
     let theta = 0.5;
     let thetaMargin = 0.3;
     let target = (0.1, 0.2, 0.5);
     let moveSpeedX = 0.1;
     let moveSpeedY = 0.2;
     let rotateSpeed = 0.3;
     let wheelSpeed = 0.4;

     let state =
       state
       |> setFlyCameraControllerMinDistance(cameraController, minDistance)
       |> setFlyCameraControllerDistance(cameraController, distance)
       |> setFlyCameraControllerPhi(cameraController, phi)
       |> setFlyCameraControllerTheta(cameraController, theta)
       |> setFlyCameraControllerThetaMargin(cameraController, thetaMargin)
       |> setFlyCameraControllerTarget(cameraController, target)
       |> setFlyCameraControllerMoveSpeedX(cameraController, moveSpeedX)
       |> setFlyCameraControllerMoveSpeedY(cameraController, moveSpeedY)
       |> setFlyCameraControllerRotateSpeed(cameraController, rotateSpeed)
       |> setFlyCameraControllerWheelSpeed(cameraController, wheelSpeed);

     (
       state,
       (
         distance,
         minDistance,
         phi,
         theta,
         thetaMargin,
         target,
         moveSpeedX,
         moveSpeedY,
         rotateSpeed,
         wheelSpeed,
       ),
     );
   }; */

let getDirtyArray = state => state.flyCameraControllerRecord.dirtyArray;

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