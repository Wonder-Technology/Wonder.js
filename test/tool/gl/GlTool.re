open StateDataMainType;

let unsafeGetGl =
  [@bs] ((state) => [@bs] DeviceManagerService.unsafeGetGl(state.deviceManagerRecord));