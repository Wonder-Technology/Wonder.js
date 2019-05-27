open StateDataRenderWorkerType;

let unsafeGetGl = state =>
  DeviceManagerService.unsafeGetGl(. state.deviceManagerRecord) |> Obj.magic;