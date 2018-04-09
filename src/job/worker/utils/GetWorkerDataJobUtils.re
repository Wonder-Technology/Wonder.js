open StateDataMainType;

let execJob = (flags, stateData) =>
  GetWorkerDataUtils.createGetOtherWorkerDataStream(
    flags,
    WorkerInstanceService.unsafeGetRenderWorker(
      StateDataMainService.unsafeGetState(stateData).workerInstanceRecord
    )
  );