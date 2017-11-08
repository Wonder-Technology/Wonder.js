open CameraControllerType;

let isCameraController = (cameraController: cameraController) => {
  open Jest;
  open Expect;
  open! Expect.Operators;
  expect(cameraController) >= 0
};

let getCameraControllerData = (state: StateDataType.state) => state.cameraControllerData;

let getDirtyList = (state: StateDataType.state) => getCameraControllerData(state).dirtyList;

let getWorldToCameraMatrix = (cameraController, state: StateDataType.state) =>
  CameraControllerSystem.getWorldToCameraMatrix(cameraController, state);

let getPMatrix = (cameraController, state: StateDataType.state) =>
  CameraControllerSystem.getPMatrix(cameraController, state);

let setWorldToCameraMatrixCacheMap =
    (cameraController, matrix: ArraySystem.t(float), state: StateDataType.state) => {
  HashMapSystem.set(
    Js.Int.toString(cameraController),
    matrix,
    getCameraControllerData(state).worldToCameraMatrixCacheMap
  )
  |> ignore;
  state
};

let init = (state: StateDataType.state) => CameraControllerSystem.init(state);

let update = (state: StateDataType.state) => CameraControllerSystem.update(state);

let createCameraController_perspectiveCamera = (state) => {
  open CameraController;
  open PerspectiveCamera;
  let (state, cameraController) = createCameraController(state);
  let state =
    state
    |> setPerspectiveCameraNear(cameraController, 0.1)
    |> setPerspectiveCameraFar(cameraController, 1000.)
    |> setPerspectiveCameraFovy(cameraController, 65.)
    |> setPerspectiveCameraAspect(cameraController, 0.8);
  let state = state |> setCameraControllerPerspectiveCamera(cameraController);
  (state, cameraController)
};