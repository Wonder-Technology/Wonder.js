open StateDataType;

open PerspectiveCameraSystem;

open CameraControllerStateUtils;

let getPerspectiveCameraFovy = (cameraController, state) =>
  state |> getPerspectiveCameraData |> getFovy(cameraController) |> Js.Option.getExn;

let setPerspectiveCameraFovy = setFovy;

let getPerspectiveCameraAspect = (cameraController, state) =>
  state |> getPerspectiveCameraData |> getAspect(cameraController) |> Js.Option.getExn;

let setPerspectiveCameraAspect = setAspect;

let getPerspectiveCameraNear = (cameraController, state) =>
  state |> getPerspectiveCameraData |> getNear(cameraController) |> Js.Option.getExn;

let setPerspectiveCameraNear = setNear;

let getPerspectiveCameraFar = (cameraController, state) =>
  state |> getPerspectiveCameraData |> getFar(cameraController) |> Js.Option.getExn;

let setPerspectiveCameraFar = setFar;