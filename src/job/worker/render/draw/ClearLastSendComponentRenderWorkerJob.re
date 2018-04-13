open StateDataRenderWorkerType;

let execJob = (flags, e, stateData) =>
  MostUtils.callFunc(
    () => {
      let state = StateRenderWorkerService.unsafeGetState(stateData);
      state.glslSenderRecord = ClearLastSendComponentJobUtils.execJob(state.glslSenderRecord);
      e
    }
  );