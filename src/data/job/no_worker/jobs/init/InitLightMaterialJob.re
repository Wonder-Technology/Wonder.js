open StateDataType;

let execJob = (flags, state) =>
  InitLightMaterialService.init([@bs] DeviceManagerService.unsafeGetGl(state.deviceManagerRecord), state);