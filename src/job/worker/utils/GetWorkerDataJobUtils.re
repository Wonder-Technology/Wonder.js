open StateDataMainType;

let execNoDataJob = (flags, stateData) =>
  GetWorkerDataUtils.createGetOtherWorkerNoDataStream(
    flags,
    WorkerInstanceService.unsafeGetRenderWorker(
      StateDataMainService.unsafeGetState(stateData).workerInstanceRecord
    )
  );


let createGetOtherWorkerDataStream = (flags, stateData) =>
  GetWorkerDataUtils.createGetOtherWorkerDataStream(
    flags,
    WorkerInstanceService.unsafeGetRenderWorker(
      StateDataMainService.unsafeGetState(stateData).workerInstanceRecord
    )
  );