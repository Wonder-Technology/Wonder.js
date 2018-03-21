open MainStateDataType;

let execJob = (flags, stateData) =>
  GetWorkerDataUtils.createGetOtherWorkerDataStream(
    flags,
    WorkerInstanceService.unsafeGetRenderWorker(
      StateDataMainService.getState(stateData).workerInstanceRecord
    )
  );