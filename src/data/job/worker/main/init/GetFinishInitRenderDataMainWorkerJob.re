let execJob = (flags, stateData) =>
  GetWorkerDataUtils.createGetOtherWorkerDataStream(
    flags,
    WorkerInstanceSystem.unsafeGetRenderWorker(StateDataMainService.getState(stateData))
  );