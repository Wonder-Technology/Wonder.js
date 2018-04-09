open StateDataMainType;

let execJob = (flags, stateData) =>
  MostUtils.callFunc(
    () => {
      let state = StateDataMainService.unsafeGetState(stateData);
      state.timeControllerRecord =
        state.timeControllerRecord
        |> TimeControllerService.tick(TimeControllerService.getElapsed(state.timeControllerRecord));
      None
    }
  );