open StateDataType;

let create =
    ((setting, main_init_pipelines, main_init_jobs,worker_pipelines,  worker_jobs), state) => {
  ...state,
  workerJobConfig:
    Some({
      setting,
      mainInitPipelines: main_init_pipelines,
      workerPipelines: worker_pipelines,
      mainInitJobs: main_init_jobs,
      workerJobs: worker_jobs
    })
};