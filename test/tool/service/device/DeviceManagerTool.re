open MainStateDataType;

let getDeviceManagerRecord = (state: MainStateDataType.state) => state.deviceManagerRecord;

let setSide = (gl, targetSide, record) => DeviceManagerService.setSide(gl, targetSide, record);

let setViewportOfGl = (gl, viewport, record) =>
  DeviceManagerService.setViewportOfGl(gl, viewport, record);