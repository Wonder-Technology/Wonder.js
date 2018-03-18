open MainStateDataType;

let execJob = (flags, stateData) =>
  MostUtils.callFunc(
    () => {
      let state = StateDataMainService.getState(stateData);
      let operateType = JobConfigUtils.getOperateType(flags);
      WorkerInstanceService.unsafeGetRenderWorker(state.workerInstanceRecord)
      |> WorkerService.postMessage({"operateType": operateType});
      Some(operateType)
    }
  );