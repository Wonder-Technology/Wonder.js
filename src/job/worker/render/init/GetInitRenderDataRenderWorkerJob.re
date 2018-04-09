let execJob = (flags, _, stateData) =>
  GetWorkerDataUtils.createGetMainWorkerDataStream(flags, WorkerService.getSelf());