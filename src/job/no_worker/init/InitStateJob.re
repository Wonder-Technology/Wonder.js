open StateDataMainType;

open DeviceManagerType;

let execJob = (flags, state) => {
  ...state,
  deviceManagerRecord: InitStateJobUtils.execJob(state.deviceManagerRecord)
};