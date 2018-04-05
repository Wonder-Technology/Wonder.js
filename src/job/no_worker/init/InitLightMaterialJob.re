open StateDataMainType;

let execJob = (flags, state) =>
  InitLightMaterialMainService.init([@bs] DeviceManagerService.unsafeGetGl(state.deviceManagerRecord), state);