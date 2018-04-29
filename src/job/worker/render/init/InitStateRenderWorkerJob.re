open StateDataRenderWorkerType;

let execJob = (_, e, stateData) =>
  MostUtils.callFunc(
    () => {
      let state = StateRenderWorkerService.unsafeGetState(stateData);
      state.deviceManagerRecord = InitStateJobUtils.execJob(state.deviceManagerRecord);
      StateRenderWorkerService.setState(stateData, state);
      e
    }
  );