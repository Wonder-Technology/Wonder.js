let execJob = (_, e, stateData) =>
  MostUtils.callFunc(
    () => {
      let state = StateRenderWorkerService.unsafeGetState(stateData);
      let data = MessageService.getRecord(e);
      let gpuData = data##gpuData;
      let memoryData = data##memoryData;
      let instanceBufferData = data##instanceBufferData;
      state.settingRecord = {
        gpu: Some({useHardwareInstance: gpuData##useHardwareInstance}),
        memory: Some({maxBigTypeArrayPoolSize: memoryData##maxBigTypeArrayPoolSize}),
        instanceBuffer:
          Some({
            sourceInstanceCount: instanceBufferData##sourceInstanceCount,
            objectInstanceCountPerSourceInstance: instanceBufferData##objectInstanceCountPerSourceInstance
          }),
        textureCountPerMaterial: data##bufferData##instanceBufferData
      };
      StateRenderWorkerService.setState(stateData, state);
      e
    }
  );