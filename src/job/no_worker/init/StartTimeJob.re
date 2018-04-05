open StateDataMainType;

let execJob = (_, state) => {
  ...state,
  timeControllerRecord: TimeControllerService.start(state.timeControllerRecord)
};