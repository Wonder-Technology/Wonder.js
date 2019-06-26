open AllBrowserDetectType;

let execJob = (_, e, stateData) =>
  MostUtils.callFunc(
    () => {
      let state = StateRenderWorkerService.unsafeGetState(stateData);
      let data = MessageService.getRecord(e);
      let browserDetectData = data##browserDetectData;
      state.browserDetectRecord = Some({browser: browserDetectData##browser});
      StateRenderWorkerService.setState(stateData, state);
      e
    }
  );