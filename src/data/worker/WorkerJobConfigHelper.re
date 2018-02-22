open StateDataType;

let initData =
    ((worker_setting, main_init_pipelines, worker_pipelines, main_init_jobs, worker_jobs), state) => {
  ...state,
  workerJobConfig:
    Some({
      workerSetting: worker_setting,
      mainInitPipelines: main_init_pipelines,
      workerPipelines: worker_pipelines,
      mainInitJobs: main_init_jobs,
      workerJobs: worker_jobs
    })
};