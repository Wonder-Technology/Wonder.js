open StateDataType;

let initData = ((setting, init_pipelines, loop_pipelines, init_jobs, loop_jobs), state) => {
  ...state,
  noWorkerJobConfig:
    Some({
      setting,
      initPipelines: init_pipelines,
      loopPipelines: loop_pipelines,
      initJobs: init_jobs,
      loopJobs: loop_jobs
    })
};