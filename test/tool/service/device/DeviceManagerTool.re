open StateDataMainType;

let getDeviceManagerRecord = (state: StateDataMainType.state) =>
  state.deviceManagerRecord;

let setGl = (gl, state) => {
  ...state,
  deviceManagerRecord:
    DeviceManagerService.setGl(gl, state.deviceManagerRecord),
};

let setSide = (gl, targetSide, record) =>
  DeviceManagerService.setSide(gl, targetSide, record);