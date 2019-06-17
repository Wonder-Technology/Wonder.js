open StateDataRenderWorkerType;

let execJob = (flags, e, stateData) =>
  MostUtils.callFunc(
    () => {
      let state = StateRenderWorkerService.unsafeGetState(stateData);
      let gl = [@bs] AllDeviceManagerService.unsafeGetGl(state.deviceManagerRecord);
      state.deviceManagerRecord =
        AllDeviceManagerService.clearBuffer(
          gl,
          ClearBufferJobUtils.getBit(gl, JobConfigService.unsafeGetFlags(flags)),
          state.deviceManagerRecord
        );
      StateRenderWorkerService.setState(stateData, state);
      e
    }
  );