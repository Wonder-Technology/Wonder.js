open PipelinePOType;

type pipelineRepo = {
  getJobExecFunc: (pipelineName, jobName) => option(execFunc),
  setJobExecFunc: (pipelineName, jobName, execFunc) => unit,
  getPipelineStream: pipelineName => option(pipelineStream),
  setPipelineStream: (pipelineName, pipelineStream) => unit,
};
