open StateDataRenderWorkerType;

let unsafeGetGl = (state) => [@bs] DeviceManagerService.unsafeGetGl(state.deviceManagerRecord);