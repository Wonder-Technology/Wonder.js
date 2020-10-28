open PipelinePOType;

type pipelineData = PipelineVOType.pipelineData;

type pipeline = {
  initPipeline: pipelineName,
  // updatePipeline: pipelineName,
  // renderPipeline: pipelineName,
  initPipelineData: pipelineData,
  // updatePipelineData: pipelineData,
  // renderPipelineData: pipelineData,
  pipelineStreamMap: ImmutableHashMap.t(pipelineName, pipelineStream),
  jobExecFuncMap:
    ImmutableHashMap.t(pipelineName, ImmutableHashMap.t(jobName, execFunc)),
};
