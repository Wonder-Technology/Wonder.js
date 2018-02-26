type setting = {
  workerFileDir: string,
  mainInitPipeline: string,
  workerPipeline: string
};

type jobFlags = option(array(string));

type job = {
  name: string,
  flags: jobFlags
};

type mainInitJobs = array(job);

type workerJobs = array(job);

type executableJob = {name: string};

type receive = {
  name: string,
  from: string,
  type_: string
};

/* type main = {
     name: string,
     parents: option(array(string))
   }; */
type mainInitPipelineSubJob = {name: string};

type mainInitPipelineJob = {
  name: string,
  link: string,
  jobs: array(mainInitPipelineSubJob)
};

type mainInitPipeline = {
  name: string,
  jobs: array(mainInitPipelineJob)
};

type mainInitPipelines = array(mainInitPipeline);

type workerPipelineWorkerJob = {name: string};

type workerPipelineJobs = {render: array(array(workerPipelineWorkerJob))};

type workerPipeline = {
  name: string,
  jobs: workerPipelineJobs
};

type workerPipelines = array(workerPipeline);

type workerJobConfig = {
  setting,
  mainInitPipelines,
  workerPipelines,
  mainInitJobs,
  workerJobs
};