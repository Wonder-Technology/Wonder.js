open StateDataMainType;

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

let setPointDragEventHandleFunc =
    (cameraController, handleFunc, {arcballCameraControllerRecord} as state) => {
  ...state,
  arcballCameraControllerRecord:
    DisposeArcballCameraControllerMainService.setPointDragEventHandleFunc(
      cameraController,
      handleFunc,
      arcballCameraControllerRecord,
    ),
};

let setPointScaleEventHandleFunc =
    (cameraController, handleFunc, {arcballCameraControllerRecord} as state) => {
  ...state,
  arcballCameraControllerRecord:
    DisposeArcballCameraControllerMainService.setPointScaleEventHandleFunc(
      cameraController,
      handleFunc,
      arcballCameraControllerRecord,
    ),
};

let setKeydownEventHandleFunc =
    (cameraController, handleFunc, {arcballCameraControllerRecord} as state) => {
  ...state,
  arcballCameraControllerRecord:
    DisposeArcballCameraControllerMainService.setKeydownEventHandleFunc(
      cameraController,
      handleFunc,
      arcballCameraControllerRecord,
    ),
};