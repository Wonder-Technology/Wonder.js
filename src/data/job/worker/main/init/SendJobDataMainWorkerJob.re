open MainStateDataType;

let execJob = (flags, stateData) =>
  MostUtils.callFunc(
    () => {
      let state = StateDataMainService.getState(stateData);
      /* TODO refactor: move to utils */
      /* TODO refactor: not dependent on WorkerJobConfigSystem??? */
      let operateType = JobConfigService.unsafeGetFlags(flags)[0];
      WorkerInstanceSystem.unsafeGetRenderWorker(state)
      |> WorkerService.postMessage({
           "operateType": operateType,
           /* "pipelineJobs": WorkerJobConfigSystem.getRenderWorkerPipelineJobs(state),
              "jobs": WorkerJobConfigSystem.getWorkerJobs(state) */
           "pipelineJobs":
             OperateWorkerJobService.getRenderWorkerPipelineJobs(state.workerJobRecord)
             |> Obj.magic
             |> Js.Json.stringify,
           "jobs":
             OperateWorkerJobService.getWorkerJobs(state.workerJobRecord)
             |> Obj.magic
             |> Js.Json.stringify
         });
      Some(operateType)
    }
  );