open StateDataRenderWorkerType;

let execJob = (_, e, stateData) =>
  MostUtils.callFunc(() => {
    let state = StateRenderWorkerService.unsafeGetState(stateData);
    let data = MessageService.getRecord(e);
    state.gpuDetectRecord =
      state.gpuDetectRecord
      |> GPUDetectService.detect(
           DeviceManagerService.unsafeGetGl(. state.deviceManagerRecord),
         );
    StateRenderWorkerService.setState(stateData, state);
    e;
  });