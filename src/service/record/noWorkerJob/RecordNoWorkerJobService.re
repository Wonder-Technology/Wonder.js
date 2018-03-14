open NoWorkerJobType;

let create = ((setting, init_pipelines, loop_pipelines, init_jobs, loop_jobs)) =>
  Some({
    setting,
    initPipelines: init_pipelines,
    loopPipelines: loop_pipelines,
    initJobs: init_jobs,
    loopJobs: loop_jobs
  });