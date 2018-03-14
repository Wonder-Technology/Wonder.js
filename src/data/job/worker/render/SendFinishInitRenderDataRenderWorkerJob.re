let execJob = (flags, e, stateData) =>
  MostUtils.callFunc(
    () => {
      /* TODO refactor: move to utils */
      WorkerService.getSelf()
      |> WorkerService.postMessage({"operateType": JobConfigService.unsafeGetFlags(flags)[0]})
      |> ignore;
      e
    }
  );