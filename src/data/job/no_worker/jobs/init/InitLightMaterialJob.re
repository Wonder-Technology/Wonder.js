open StateDataType;

let execJob = (flags, state) =>
  InitLightMaterialService.init([@bs] DeviceManagerSystem.unsafeGetGl(state), state);