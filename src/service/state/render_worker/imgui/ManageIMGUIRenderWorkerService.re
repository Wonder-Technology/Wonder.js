open StateDataRenderWorkerType;

let getRecord = state => RecordIMGUIRenderWorkerService.getRecord(state);

let setRecord = (record, state) => {
  state.imguiRecord = record;
  state;
};