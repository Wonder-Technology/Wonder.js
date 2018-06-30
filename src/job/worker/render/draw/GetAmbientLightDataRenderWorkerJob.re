open StateDataRenderWorkerType;

let execJob = (flags, e, stateData) =>
  MostUtils.callFunc(() => {
    let state = StateRenderWorkerService.unsafeGetState(stateData);
    let data = MessageService.getRecord(e);
    let ambientLightData = data##ambientLightData;
    let state =
      AmbientLightSceneRenderWorkerService.setAmbientLightColor(
        ambientLightData##color,
        state,
      );
    StateRenderWorkerService.setState(stateData, state);
    e;
  });