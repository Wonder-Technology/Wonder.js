open CameraControllerType;

let getData = CameraControllerSystem.getCameraControllerData;

let isCameraController = (cameraController: cameraController) => {
  open Wonder_jest;
  open Expect;
  open! Expect.Operators;
  expect(cameraController) >= 0
};

let getCameraControllerData = (state: StateDataType.state) => state.cameraControllerData;

let getPerspectiveCameraData = (state: StateDataType.state) =>
  CameraControllerStateCommon.getPerspectiveCameraData(state);

let getDirtyArray = (state: StateDataType.state) => getCameraControllerData(state).dirtyArray;

let getWorldToCameraMatrix = (transform, state: StateDataType.state) =>
  CameraControllerSystem.getWorldToCameraMatrix(transform, state);

let getPosition = (transform, state: StateDataType.state) =>
  CameraControllerSystem.getPosition(transform, state);

let unsafeGetPMatrix = (cameraController, state: StateDataType.state) =>
  CameraControllerSystem.unsafeGetPMatrix(cameraController, state);

/* let setWorldToCameraMatrixCacheMap =
       (cameraController, matrix: ArraySystem.t(float), state: StateDataType.state) => {
     SparseMapSystem.set(
       (cameraController),
       matrix,
       getCameraControllerData(state).worldToCameraMatrixCacheMap
     )
     |> ignore;
     state
   }; */
let init = (state: StateDataType.state) => CameraControllerSystem.init(state);

let update = (state: StateDataType.state) => CameraControllerSystem.update(state);

let createCameraControllerPerspectiveCamera = (state) => {
  open CameraController;
  open PerspectiveCamera;
  let (state, cameraController) = createCameraController(state);
  let state =
    state
    |> setPerspectiveCameraNear(cameraController, 0.1)
    |> setPerspectiveCameraFar(cameraController, 1000.)
    |> setPerspectiveCameraFovy(cameraController, 60.)
    |> setPerspectiveCameraAspect(cameraController, 1.);
  let state = state |> setCameraControllerPerspectiveCamera(cameraController);
  (state, cameraController)
};

let getPMatrixOfCreateCameraControllerPerspectiveCamera = () =>
  Js.Typed_array.Float32Array.make([|
    1.7320508075688776,
    0.,
    0.,
    0.,
    0.,
    1.7320508075688776,
    0.,
    0.,
    0.,
    0.,
    (-1.0002000200020003),
    (-1.),
    0.,
    0.,
    (-0.2000200020002),
    0.
  |]);

let createCameraGameObject = (state) => {
  open GameObject;
  open CameraController;
  let (state, cameraController) = createCameraControllerPerspectiveCamera(state);
  let (state, gameObject) = state |> createGameObject;
  let state = state |> addGameObjectCameraControllerComponent(gameObject, cameraController);
  (state, gameObject, getGameObjectTransformComponent(gameObject, state), cameraController)
};

let getCurrentCameraController = CameraControllerSystem.getCurrentCameraController;

let testBuildPMatrix = (state, execFunc) =>
  Wonder_jest.(
    CameraController.(
      Expect.(
        Expect.Operators.(
          test(
            "build dirty cameraControllers' pMatrix",
            () => {
              let (state, cameraController) = createCameraControllerPerspectiveCamera(state);
              let state = state |> execFunc;
              state
              |> getCameraControllerPMatrix(cameraController)
              |>
              expect == Js.Typed_array.Float32Array.make([|
                          1.7320508075688776,
                          0.,
                          0.,
                          0.,
                          0.,
                          1.7320508075688776,
                          0.,
                          0.,
                          0.,
                          0.,
                          (-1.0002000200020003),
                          (-1.),
                          0.,
                          0.,
                          (-0.2000200020002),
                          0.
                        |])
            }
          )
        )
      )
    )
  );