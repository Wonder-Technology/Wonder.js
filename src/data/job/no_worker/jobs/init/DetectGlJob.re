open StateDataType;

let execJob = (_, state) =>
  state |> GPUDetectSystem.detect([@bs] DeviceManagerSystem.unsafeGetGl(state));