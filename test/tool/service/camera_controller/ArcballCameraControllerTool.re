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

let getDirtyArray = state => state.arcballCameraControllerRecord.dirtyArray;

let getPointDragEventHandleFuncMap =
    ({arcballCameraControllerRecord} as state) =>
  arcballCameraControllerRecord.pointDragEventHandleFuncMap;

let setPointDragEventHandleFunc =
    (cameraController, handleFunc, {arcballCameraControllerRecord} as state) => {
  ...state,
  arcballCameraControllerRecord:
    EventArcballCameraControllerMainService.setPointDragEventHandleFunc(
      cameraController,
      handleFunc,
      arcballCameraControllerRecord,
    ),
};

let setPointScaleEventHandleFunc =
    (cameraController, handleFunc, {arcballCameraControllerRecord} as state) => {
  ...state,
  arcballCameraControllerRecord:
    EventArcballCameraControllerMainService.setPointScaleEventHandleFunc(
      cameraController,
      handleFunc,
      arcballCameraControllerRecord,
    ),
};

let setKeydownEventHandleFunc =
    (cameraController, handleFunc, {arcballCameraControllerRecord} as state) => {
  ...state,
  arcballCameraControllerRecord:
    EventArcballCameraControllerMainService.setKeydownEventHandleFunc(
      cameraController,
      handleFunc,
      arcballCameraControllerRecord,
    ),
};