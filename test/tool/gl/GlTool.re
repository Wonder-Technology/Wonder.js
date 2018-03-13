open StateDataType;

let unsafeGetGl =
  [@bs] ((state) => [@bs] DeviceManagerService.unsafeGetGl(state.deviceManagerRecord));