open StateDataRenderWorkerType;

let execJob = (_, e, stateData) =>
  MostUtils.callFunc(
    () => {
      let state = StateRenderWorkerService.unsafeGetState(stateData);
      let data = MessageService.getRecord(e);
      state.gpuDetectRecord =
        state.gpuDetectRecord
        |> GPUDetectService.detect(
             [@bs] DeviceManagerService.unsafeGetGl(state.deviceManagerRecord),
             data##bufferData##textureCountPerMaterial
           );
      StateRenderWorkerService.setState(stateData, state);
      e
    }
  );