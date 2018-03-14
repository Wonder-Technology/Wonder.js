open MainStateDataType;

let execJob = (flags, state) =>
  InitBasicMaterialMainService.init([@bs] DeviceManagerService.unsafeGetGl(state.deviceManagerRecord), state);