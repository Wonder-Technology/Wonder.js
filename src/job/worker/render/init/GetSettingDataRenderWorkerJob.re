let execJob = (_, e, stateData) =>
  MostUtils.callFunc(
    () => {
      let state = StateRenderWorkerService.unsafeGetState(stateData);
      let data = MessageService.getRecord(e);
      let gpuData = data##gpuData;
      state.settingRecord = {gpu: Some({useHardwareInstance: gpuData##useHardwareInstance})};
      e
    }
  );