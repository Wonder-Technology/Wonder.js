open MainStateDataType;

let execJob = (flags, stateData) =>
  MostUtils.callFunc(
    () => {
      let state = StateDataMainService.getState(stateData);
      let operateType = JobConfigUtils.getOperateType(flags);
      WorkerInstanceService.unsafeGetRenderWorker(state.workerInstanceRecord)
      |> WorkerService.postMessage({
           "operateType": operateType,
           "pipelineJobs":
             OperateRenderWorkerJobService.getRenderWorkerPipelineJobs(state.workerJobRecord)
             |> Obj.magic
             |> Js.Json.stringify,
           "jobs":
             OperateRenderWorkerJobService.getWorkerJobs(state.workerJobRecord)
             |> Obj.magic
             |> Js.Json.stringify
         });
      Some(operateType)
    }
  );