open StateDataRenderWorkerType;

let execJob = (flags, e, stateData) =>
  MostUtils.callFunc(
    () => {
      let state = StateRenderWorkerService.unsafeGetState(stateData);
      state.deviceManagerRecord = ClearColorJobUtils.execJob(flags, state.deviceManagerRecord);
      StateRenderWorkerService.setState(stateData, state);
      e
    }
  );