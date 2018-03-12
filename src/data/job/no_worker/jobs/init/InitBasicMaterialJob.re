open StateDataType;

let execJob = (flags, state) =>
  InitBasicMaterialService.init([@bs] DeviceManagerSystem.unsafeGetGl(state), state);