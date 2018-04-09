open StateDataMainType;

let execJob = (flags, state) => {
  ...state,
  timeControllerRecord:
    state.timeControllerRecord
    |> TimeControllerService.tick(TimeControllerService.getElapsed(state.timeControllerRecord))
};