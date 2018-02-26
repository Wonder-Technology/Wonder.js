let execJob = (flags, _, stateData) =>
  GetWorkerDataUtils.createGetMainWorkerDataStream(flags, WorkerUtils.getSelf());