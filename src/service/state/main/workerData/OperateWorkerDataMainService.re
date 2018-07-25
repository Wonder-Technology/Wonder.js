open StateDataMainType;

let getRenderWorkerCustomData = state =>
  state.workerDataRecord.renderWorkerData.
    customDataFromRenderWorkerToMainWorker;

let setRenderWorkerCustomData = (customData, state) => {
  ...state,
  workerDataRecord: {
    ...state.workerDataRecord,
    renderWorkerData: {
      customDataFromRenderWorkerToMainWorker: Obj.magic(customData),
    },
  },
};

let getMainWorkerCustomData = state =>
  state.workerDataRecord.mainWorkerData.customDataFromMainWorkerToRenderWorker;

let setMainWorkerCustomData = (customData, state) => {
  ...state,
  workerDataRecord: {
    ...state.workerDataRecord,
    mainWorkerData: {
      customDataFromMainWorkerToRenderWorker: Obj.magic(customData),
    },
  },
};