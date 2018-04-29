open StateDataMainType;

let execJob = (flags, stateData) =>
  MostUtils.callFunc(
    () => {
      let state = StateDataMainService.unsafeGetState(stateData);
      let state = state |> ReallocateCPUMemoryJobUtils.execJob;
      StateDataMainService.setState(stateData, state);
      None
    }
  );