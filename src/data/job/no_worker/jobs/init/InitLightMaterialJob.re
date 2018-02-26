open StateDataType;

let execJob = (flags, state) => LightMaterialAdmin.init([@bs] DeviceManagerSystem.unsafeGetGl(state), state);