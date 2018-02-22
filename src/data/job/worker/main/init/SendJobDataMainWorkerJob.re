let execJob = (flags, stateData) =>
  MostUtils.callFunc(
    () => {
      let state = StateSystem.getState(stateData);
      /* TODO refactor: move to utils */
      /* TODO refactor: not dependent on WorkerJobConfigSystem??? */
      WorkerInstanceSystem.unsafeGetRenderWorker(state)
      |> Worker.postMessage({
           "operateType": WorkerJobConfigSystem.unsafeGetFlags(flags)[0],
           "pipelineJobs": WorkerJobConfigSystem.getRenderWorkerPipelineJobs(state),
           "jobs": WorkerJobConfigSystem.getWorkerJobs(state)
         })
    }
  );