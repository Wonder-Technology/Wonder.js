open StateDataRenderWorkerType;

let execJob = (_, e, stateData) =>
  MostUtils.callFunc(() => {
    let state = StateRenderWorkerService.unsafeGetState(stateData);
    let data = MessageService.getRecord(e);
    state.gpuDetectRecord =
      state.gpuDetectRecord
      |> AllGPUDetectService.detect(
           AllDeviceManagerService.unsafeGetGl(. state.deviceManagerRecord),
         );
    StateRenderWorkerService.setState(stateData, state);
    e;
  });