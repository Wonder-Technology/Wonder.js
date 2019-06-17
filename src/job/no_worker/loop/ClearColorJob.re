open StateDataMainType;

open AllRenderConfigType;

let execJob = (flags, state) => {
  ...state,
  deviceManagerRecord: ClearColorJobUtils.execJob(flags, state.deviceManagerRecord)
};