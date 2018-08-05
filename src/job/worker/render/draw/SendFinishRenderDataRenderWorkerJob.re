let execJob = (flags, e, stateData) =>
  MostUtils.callFunc(() => {
    let state = StateRenderWorkerService.unsafeGetState(stateData);

    WorkerService.getSelf()
    |> WorkerService.postMessage({
         "operateType": JobConfigUtils.getOperateType(flags),
         "customData":
           OperateCustomRenderWorkerService.getCustomDataFromRenderWorkerToMainWorker(
             state,
           )
       })
    |> ignore;
    e;
  });