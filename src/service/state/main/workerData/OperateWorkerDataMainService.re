open StateDataMainType;

let getRenderWorkerCustomData = state =>
  state.workerDataRecord.renderWorkerData.
    customDataFromRenderWorkerToMainWorker;

let setRenderWorkerCustomData = (customData, state) => {
  ...state,
  workerDataRecord: {
    renderWorkerData: {
      customDataFromRenderWorkerToMainWorker: Obj.magic(customData),
    },
  },
};

let hasRenderWorkerCustomData = state =>
  RecordWorkerDataService.hasRenderWorkerCustomData(state.workerDataRecord);