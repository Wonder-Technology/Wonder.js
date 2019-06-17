open StateDataMainType;

let getDeviceManagerRecord = (state: StateDataMainType.state) =>
  state.deviceManagerRecord;

let getGl = state => DeviceManagerAPI.unsafeGetGl(state) |. Some;

let setGl = (gl, state) => {
  ...state,
  deviceManagerRecord:
    AllDeviceManagerService.setGl(gl, state.deviceManagerRecord),
};

let setSide = (gl, targetSide, record) =>
  AllDeviceManagerService.setSide(gl, targetSide, record);