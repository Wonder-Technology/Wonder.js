open StateDataMainType;

let unsafeGetGl = state =>
  DeviceManagerService.unsafeGetGl(. state.deviceManagerRecord);