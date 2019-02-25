open StateDataMainType;

let getDeviceManagerRecord = (state: StateDataMainType.state) =>
  state.deviceManagerRecord;

let getGl = state => DeviceManagerAPI.unsafeGetGl(state) |. Some;

let setGl = (gl, state) => {
  ...state,
  deviceManagerRecord:
    DeviceManagerService.setGl(gl, state.deviceManagerRecord),
};

let setSide = (gl, targetSide, record) =>
  DeviceManagerService.setSide(gl, targetSide, record);