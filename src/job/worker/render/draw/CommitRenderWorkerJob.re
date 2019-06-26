open StateDataRenderWorkerType;

let execJob = (flags, e, stateData) =>
  MostUtils.callFunc(
    () => {
      let state = StateRenderWorkerService.unsafeGetState(stateData);
      let gl = [@bs] AllDeviceManagerService.unsafeGetGl(state.deviceManagerRecord);
      CommitGlService.commit(gl);
      e
    }
  );