open StateDataRenderWorkerType;

let execJob = (flags, e, stateData) =>
  MostUtils.callFunc(
    () => {
      let state = StateRenderWorkerService.unsafeGetState(stateData);
      let gl = [@bs] DeviceManagerService.unsafeGetGl(state.deviceManagerRecord);
      state.deviceManagerRecord =
        DeviceManagerService.clearBuffer(
          gl,
          ClearBufferJobUtils.getBit(gl, JobConfigService.unsafeGetFlags(flags)),
          state.deviceManagerRecord
        );
      StateRenderWorkerService.setState(stateData, state);
      e
    }
  );