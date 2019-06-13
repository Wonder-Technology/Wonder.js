open StateDataMainType;

let execJob = (_, state) =>
  state
  |> UpdatePerspectiveCameraProjectionMainService.update
  |> UpdateArcballCameraControllerMainService.update
  |> UpdateFlyCameraControllerMainService.update;