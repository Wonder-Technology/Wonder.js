open StateDataRenderWorkerType;

let execJob = (_, e, stateData) =>
  MostUtils.callFunc(
    () => {
      let state = StateRenderWorkerService.getState(stateData);
      state.deviceManagerRecord =
        DeviceManagerService.setSide(
          [@bs] DeviceManagerService.unsafeGetGl(state.deviceManagerRecord),
          FRONT,
          state.deviceManagerRecord
        );
      StateRenderWorkerService.setState(stateData, state);
      e
    }
  );