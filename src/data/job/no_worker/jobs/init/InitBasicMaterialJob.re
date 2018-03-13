open StateDataType;

let execJob = (flags, state) =>
  InitBasicMaterialService.init([@bs] DeviceManagerService.unsafeGetGl(state.deviceManagerRecord), state);