open MainStateDataType;

let execJob = (_, state) => {
  ...state,
  timeControllerRecord: TimeControllerService.start(state.timeControllerRecord)
};