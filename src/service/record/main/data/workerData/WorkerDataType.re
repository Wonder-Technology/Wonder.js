open CustomWorkerDataType;

type mainWorkerData = {customDataFromMainWorkerToRenderWorker};

type renderWorkerData = {customDataFromRenderWorkerToMainWorker};

type workerDataRecord = {
  mainWorkerData,
  renderWorkerData,
};