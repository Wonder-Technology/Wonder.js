type setting = {
  initPipeline: string,
  loopPipeline: string
};

type jobFlags = option(array(string));

type pipelineJob = {name: string};

type pipeline = {
  name: string,
  jobs: array(pipelineJob)
};

type pipelines = array(pipeline);

type job = {
  name: string,
  flags: jobFlags
};

type initJobs = array(job);

type loopJobs = array(job);

type executableJob = {
  name: string,
  flags: jobFlags
  /* shader: option(string) */
};

/* type executableJobFlags = (jobFlags, option(string)); */
type noWorkerJobRecord = {
  setting,
  initPipelines: pipelines,
  loopPipelines: pipelines,
  initJobs,
  loopJobs
};