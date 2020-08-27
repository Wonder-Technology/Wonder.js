open PipelinePOType;

type pipelineData = PipelineVOType.pipelineData;

type pipeline = {
  initPipeline: pipelineName,
  runPipeline: pipelineName,
  initPipelineData: pipelineData,
  runPipelineData: pipelineData,
  pipelineStreamMap: ImmutableHashMap.t(pipelineName, pipelineStream),
  jobExecFuncMap:
    ImmutableHashMap.t(pipelineName, ImmutableHashMap.t(jobName, execFunc)),
};
