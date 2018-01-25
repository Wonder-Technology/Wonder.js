type logic_setting = {
  init_pipeline: string,
  update_pipeline: string
};

/* type jobFlags = option(array(string)); */
type jobItem = {
  name: string
  /* flags: jobFlags */
};

type pipeline = {
  name: string,
  jobs: array(jobItem)
};

type pipelines = array(pipeline);

type job = {name: string};

type init_jobs = array(job);

type update_jobs = array(job);

type executableJob = {
  name: string
  /* flags: jobFlags,
     shader: option(string) */
};

/* type executableJobFlags = (jobFlags, option(string)); */
type logicConfig = {
  logic_setting,
  init_pipelines: pipelines,
  update_pipelines: pipelines,
  init_jobs,
  update_jobs
};