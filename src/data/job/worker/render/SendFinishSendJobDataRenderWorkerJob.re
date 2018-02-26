let execJob = (flags, e, stateData) =>
  MostUtils.callFunc(
    () => {
      /* TODO refactor: move to utils */
      WorkerUtils.getSelf()
      |> WorkerUtils.postMessage({"operateType": JobConfigSystem.unsafeGetFlags(flags)[0]})
      |> ignore;
      e
    }
  );