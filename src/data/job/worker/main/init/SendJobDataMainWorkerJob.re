let execJob = (flags, stateData) =>
  MostUtils.callFunc(
    () => {
      let state = StateSystem.getState(stateData);
      /* TODO refactor: move to utils */
      /* TODO refactor: not dependent on WorkerJobConfigSystem??? */
      let operateType = JobConfigService.unsafeGetFlags(flags)[0];
      WorkerInstanceSystem.unsafeGetRenderWorker(state)
      |> WorkerUtils.postMessage({
           "operateType": operateType,
           /* "pipelineJobs": WorkerJobConfigSystem.getRenderWorkerPipelineJobs(state),
              "jobs": WorkerJobConfigSystem.getWorkerJobs(state) */
           "pipelineJobs":
             WorkerJobConfigSystem.getRenderWorkerPipelineJobs(state)
             |> Obj.magic
             |> Js.Json.stringify,
           "jobs": WorkerJobConfigSystem.getWorkerJobs(state) |> Obj.magic |> Js.Json.stringify
         });
      Some(operateType)
    }
  );