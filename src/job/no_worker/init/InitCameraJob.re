open StateDataMainType;

let execJob = (_, state) =>
  state |> InitPerspectiveCameraProjectionMainService.init;