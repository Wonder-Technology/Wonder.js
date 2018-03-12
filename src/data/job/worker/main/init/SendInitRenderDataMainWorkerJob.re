let execJob = (flags, stateData) =>
  MostUtils.callFunc(
    () => {
      let state = StateSystem.getState(stateData);
      let operateType = JobConfigService.unsafeGetFlags(flags)[0];
      /* TODO refactor: move to utils */
      WorkerInstanceSystem.unsafeGetRenderWorker(state)
      |> WorkerUtils.postMessage({"operateType": operateType});
      Some(operateType)
    }
  );