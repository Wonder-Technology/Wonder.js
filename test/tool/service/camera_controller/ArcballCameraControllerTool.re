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

let getDirtyArray = state => state.arcballCameraControllerRecord.dirtyArray;

let getPointDragEventHandleFuncMap =
    ({arcballCameraControllerRecord} as state) =>
  arcballCameraControllerRecord.pointDragEventHandleFuncMap;

let setPointDragEventHandleFunc =
    (cameraController, handleFunc, {arcballCameraControllerRecord} as state) => {
  ...state,
  arcballCameraControllerRecord:
    EventArcballCameraControllerMainService._setPointDragEventHandleFunc(
      cameraController,
      handleFunc,
      arcballCameraControllerRecord,
    ),
};

let setPointScaleEventHandleFunc =
    (cameraController, handleFunc, {arcballCameraControllerRecord} as state) => {
  ...state,
  arcballCameraControllerRecord:
    EventArcballCameraControllerMainService._setPointScaleEventHandleFunc(
      cameraController,
      handleFunc,
      arcballCameraControllerRecord,
    ),
};

let setKeydownEventHandleFunc =
    (cameraController, handleFunc, {arcballCameraControllerRecord} as state) => {
  ...state,
  arcballCameraControllerRecord:
    EventArcballCameraControllerMainService._setKeydownEventHandleFunc(
      cameraController,
      handleFunc,
      arcballCameraControllerRecord,
    ),
};