open StateDataType;

open DeviceManagerType;

let execJob = (configData, gl, state) => DeviceManagerSystem.setSide(gl, FRONT, state);