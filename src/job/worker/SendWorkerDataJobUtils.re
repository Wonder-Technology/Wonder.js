let execJob = (flags, e, stateData) =>
  MostUtils.callFunc(
    () => {
      WorkerService.getSelf()
      |> WorkerService.postMessage({"operateType": JobConfigUtils.getOperateType(flags)})
      |> ignore;
      e
    }
  );