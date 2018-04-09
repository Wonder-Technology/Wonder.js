open StateDataRenderWorkerType;

let execJob = (_, e, stateData) =>
  MostUtils.callFunc(
    () => {
      let state = StateRenderWorkerService.unsafeGetState(stateData);
      state.deviceManagerRecord =
        DeviceManagerService.setSide(
          [@bs] DeviceManagerService.unsafeGetGl(state.deviceManagerRecord),
          FRONT,
          state.deviceManagerRecord
        );
      e
    }
  );