open StateDataMainType;

open RenderConfigType;

let execJob = (flags, state) => {
  ...state,
  deviceManagerRecord: ClearColorJobUtils.execJob(flags, state.deviceManagerRecord)
};