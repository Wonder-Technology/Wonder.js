open CameraControllerSystem;

open StateDataType;

let createCameraController = create;

let setCameraControllerPerspectiveCamera = setPerspectiveCamera;

let getCameraControllerPMatrix = (cameraController, state) => getPMatrix(cameraController, state);

let getCameraControllerGameObject = (cameraController, state) =>
  getGameObject(cameraController, state) |> Js.Option.getExn;

let getCameraControllerWorldToCameraMatrix = getWorldToCameraMatrix;