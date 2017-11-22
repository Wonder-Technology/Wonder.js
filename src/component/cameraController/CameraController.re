open CameraControllerSystem;

open StateDataType;

open CameraControllerType;

open Contract;

let createCameraController = create;

let setCameraControllerPerspectiveCamera = (cameraController: int, state: StateDataType.state) => {
  requireCheck(
    () =>
      Contract.Operators.(
        ComponentSystem.checkComponentShouldAlive(cameraController, isAlive, state)
      )
  );
  setPerspectiveCamera(cameraController, state)
};

let getCameraControllerPMatrix = (cameraController, state) => {
  requireCheck(
    () =>
      Contract.Operators.(
        ComponentSystem.checkComponentShouldAlive(cameraController, isAlive, state)
      )
  );
  getPMatrix(cameraController, state)
};

let getCameraControllerGameObject = (cameraController, state) => {
  requireCheck(
    () =>
      Contract.Operators.(
        ComponentSystem.checkComponentShouldAlive(cameraController, isAlive, state)
      )
  );
  getGameObject(cameraController, state) |> Js.Option.getExn
};

let getCameraControllerWorldToCameraMatrix =
    (cameraController: cameraController, state: StateDataType.state) => {
  requireCheck(
    () =>
      Contract.Operators.(
        ComponentSystem.checkComponentShouldAlive(cameraController, isAlive, state)
      )
  );
  getWorldToCameraMatrix(cameraController, state)
};