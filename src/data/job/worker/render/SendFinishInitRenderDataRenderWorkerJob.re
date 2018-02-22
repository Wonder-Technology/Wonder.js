let execJob = (flags, e, stateData) =>
  MostUtils.callFunc(
    () => {
      /* TODO refactor: move to utils */
      WorkerUtils.getSelf()
      |> Worker.postMessage({"operateType": WorkerJobConfigSystem.unsafeGetFlags(flags)[0]})
      |> ignore;
      e
    }
  );