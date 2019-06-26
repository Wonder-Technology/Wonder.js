open StateDataMainType;

let isArcballCameraController = cameraController => {
  open Wonder_jest;
  open Expect;
  open! Expect.Operators;
  expect(cameraController) >= 0;
};

let createGameObject = state => {
  open GameObjectAPI;

  let (state, cameraController) =
    ArcballCameraControllerAPI.createArcballCameraController(state);

  let (
    state,
    gameObject,
    transform,
    (basicCameraView, perspectiveCameraProjection),
  ) =
    CameraTool.createCameraGameObject(state);

  let state =
    addGameObjectArcballCameraControllerComponent(
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

let setArcballCameraControllerData = (cameraController, state) => {
  open ArcballCameraControllerAPI;

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
    |> setArcballCameraControllerMinDistance(cameraController, minDistance)
    |> setArcballCameraControllerDistance(cameraController, distance)
    |> setArcballCameraControllerPhi(cameraController, phi)
    |> setArcballCameraControllerTheta(cameraController, theta)
    |> setArcballCameraControllerThetaMargin(cameraController, thetaMargin)
    |> setArcballCameraControllerTarget(cameraController, target)
    |> setArcballCameraControllerMoveSpeedX(cameraController, moveSpeedX)
    |> setArcballCameraControllerMoveSpeedY(cameraController, moveSpeedY)
    |> setArcballCameraControllerRotateSpeed(cameraController, rotateSpeed)
    |> setArcballCameraControllerWheelSpeed(cameraController, wheelSpeed);

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
};

/* let getPointDragStartEventHandleFuncMap =
     ({arcballCameraControllerRecord} as state) =>
   arcballCameraControllerRecord.pointDragStartEventHandleFuncMap; */

let addPointDragStartEventHandleFunc =
    (cameraController, handleFunc, {arcballCameraControllerRecord} as state) => {
  ...state,
  arcballCameraControllerRecord:
    EventArcballCameraControllerMainService._addPointDragStartEventHandleFunc(
      cameraController,
      handleFunc,
      arcballCameraControllerRecord,
    ),
};

let addPointDragDropEventHandleFunc =
    (cameraController, handleFunc, {arcballCameraControllerRecord} as state) => {
  ...state,
  arcballCameraControllerRecord:
    EventArcballCameraControllerMainService._addPointDragDropEventHandleFunc(
      cameraController,
      handleFunc,
      arcballCameraControllerRecord,
    ),
};

let addPointDragOverEventHandleFunc =
    (cameraController, handleFunc, {arcballCameraControllerRecord} as state) => {
  ...state,
  arcballCameraControllerRecord:
    EventArcballCameraControllerMainService._addPointDragOverEventHandleFunc(
      cameraController,
      handleFunc,
      arcballCameraControllerRecord,
    ),
};

let addPointScaleEventHandleFunc =
    (cameraController, handleFunc, {arcballCameraControllerRecord} as state) => {
  ...state,
  arcballCameraControllerRecord:
    EventArcballCameraControllerMainService._addPointScaleEventHandleFunc(
      cameraController,
      handleFunc,
      arcballCameraControllerRecord,
    ),
};

let addKeydownEventHandleFunc =
    (cameraController, handleFunc, {arcballCameraControllerRecord} as state) => {
  ...state,
  arcballCameraControllerRecord:
    EventArcballCameraControllerMainService._addKeydownEventHandleFunc(
      cameraController,
      handleFunc,
      arcballCameraControllerRecord,
    ),
};

let addKeyupEventHandleFunc =
    (cameraController, handleFunc, {arcballCameraControllerRecord} as state) => {
  ...state,
  arcballCameraControllerRecord:
    EventArcballCameraControllerMainService._addKeyupEventHandleFunc(
      cameraController,
      handleFunc,
      arcballCameraControllerRecord,
    ),
};