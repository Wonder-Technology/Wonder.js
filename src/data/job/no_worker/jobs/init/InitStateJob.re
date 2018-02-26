open StateDataType;

open DeviceManagerType;

let execJob = (flags, state) => DeviceManagerSystem.setSide([@bs] DeviceManagerSystem.unsafeGetGl(state), FRONT, state);