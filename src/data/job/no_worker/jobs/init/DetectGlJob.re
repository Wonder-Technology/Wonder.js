open StateDataType;

let execJob = (_, state) =>
  state |> GPUDetectSystem.detect([@bs] DeviceManagerService.unsafeGetGl(state.deviceManagerRecord));