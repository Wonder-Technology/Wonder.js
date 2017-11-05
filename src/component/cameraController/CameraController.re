open CameraControllerSystem;

open StateDataType;

let createCameraController = create;

let setCameraControllerPerspectiveCamera = setPerspectiveCamera;

/* let getCameraControllerPMatrix = (cameraController, state) =>
   Js.Option.getExn(getPMatrix(cameraController, state)); */
let getCameraControllerPMatrix = (cameraController, state) => getPMatrix(cameraController, state);

let getCameraControllerGameObject = (cameraController, state) =>
  Js.Option.getExn(getGameObject(cameraController, state));

let getCameraControllerWorldToCameraMatrix = getWorldToCameraMatrix;