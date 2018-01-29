open StateDataType;

let initData = ((logic_setting, init_pipelines, update_pipelines, init_jobs, update_jobs), state) => {
  ...state,
  logicJobConfig: Some({logic_setting, init_pipelines, update_pipelines, init_jobs, update_jobs})
};