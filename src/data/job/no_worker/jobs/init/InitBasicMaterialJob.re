open StateDataType;

let execJob = (flags, state) =>
  BasicMaterialAdmin.init([@bs] DeviceManagerSystem.unsafeGetGl(state), state);