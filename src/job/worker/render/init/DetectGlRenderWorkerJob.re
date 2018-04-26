open StateDataRenderWorkerType;

let execJob = (_, e, stateData) =>
  MostUtils.callFunc(
    () => {
      let state = StateRenderWorkerService.unsafeGetState(stateData);
      state.gpuDetectRecord =
        state.gpuDetectRecord
        |> GPUDetectService.detect(
             [@bs] DeviceManagerService.unsafeGetGl(state.deviceManagerRecord)
           );
      e
    }
  );