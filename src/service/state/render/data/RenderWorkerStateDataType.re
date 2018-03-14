open GPUDetectType;

type jobFlags = option(array(string));

type job = {
  name: string,
  flags: jobFlags
};

type pipelineJob = {name: string};

type pipelineJobs = array(array(pipelineJob));

type jobRecord = {
  pipelineJobs,
  jobs: array(job)
};

type renderWorkerState = {
  jobRecord: option(jobRecord),
  gpuDetectRecord,
  deviceManagerRecord: DeviceManagerType.deviceManagerRecord
};

type renderWorkerStateData = {mutable state: option(renderWorkerState)};