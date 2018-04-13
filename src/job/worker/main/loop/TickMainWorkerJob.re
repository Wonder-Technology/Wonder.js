open StateDataMainType;

open BasicMaterialType;

let execJob = (flags, stateData) =>
  MostUtils.callFunc(
    () => {
      let state = StateDataMainService.unsafeGetState(stateData);
      state.timeControllerRecord = TickJobUtils.execJob(state.timeControllerRecord);
      None
    }
  );