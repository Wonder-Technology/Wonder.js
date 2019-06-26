open StateDataMainType;

open AllDeviceManagerType;

let execJob = (flags, state) => {
  ...state,
  deviceManagerRecord: InitStateJobUtils.execJob(state.deviceManagerRecord)
};