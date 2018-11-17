open StateDataRenderWorkerType;

open RenderWorkerGeometryType;

let execJob = (flags, e, stateData) =>
  MostUtils.callFunc(() => {
    let state = StateRenderWorkerService.unsafeGetState(stateData);
    let data = MessageService.getRecord(e);
    let geometryData = data##renderData##geometryData;
    let indicesTypeMap = geometryData##indicesTypeMap;
    let geometeryRecord = RecordGeometryRenderWorkerService.getRecord(state);

    state.geometryRecord = Some({...geometeryRecord, indicesTypeMap});
    StateRenderWorkerService.setState(stateData, state);

    e;
  });