open WorkerJobType;

let create =
    (
      (
        setting,
        main_init_pipelines,
        main_loop_pipelines,
        main_init_jobs,
        main_loop_jobs,
        worker_pipelines,
        worker_jobs
      )
    ) =>
  Some({
    setting,
    mainInitPipelines: main_init_pipelines,
    mainLoopPipelines: main_loop_pipelines,
    workerPipelines: worker_pipelines,
    mainInitJobs: main_init_jobs,
    mainLoopJobs: main_loop_jobs,
    workerJobs: worker_jobs
  });