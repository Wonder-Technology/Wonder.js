open MainStateDataType;

let execJob = (flags, stateData) =>
  MostUtils.callFunc(
    () => {
      let state = StateDataMainService.getState(stateData);
      let operateType = JobConfigService.unsafeGetFlags(flags)[0];
      /* TODO refactor: move to utils */
      WorkerInstanceService.unsafeGetRenderWorker(state.workerInstanceRecord)
      |> WorkerService.postMessage({"operateType": operateType});
      Some(operateType)
    }
  );