open StateDataRenderWorkerType;

let unsafeGetGl = state =>
  AllDeviceManagerService.unsafeGetGl(. state.deviceManagerRecord) |> Obj.magic;