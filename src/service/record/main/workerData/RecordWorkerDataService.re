open WorkerDataType;

let create = () => {
  mainWorkerData: {
    customDataFromMainWorkerToRenderWorker: Obj.magic(-1),
  },
  renderWorkerData: {
    customDataFromRenderWorkerToMainWorker: Obj.magic(-1),
  },
};