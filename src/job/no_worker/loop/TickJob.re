open StateDataMainType;

let execJob = (flags, state) => {
  ...state,
  timeControllerRecord: TickJobUtils.execJob(state.timeControllerRecord)
};