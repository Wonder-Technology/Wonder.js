let init =
    (
      ~sandbox,
      ~isDebug=true,
      ~transformCount=10,
      ~initPipelineData=PipelineCPDoService.getInitPipelineData(),
      ~runPipelineData=PipelineCPDoService.getRunPipelineData(),
      (),
    ) => {
  PipelineCPDoService.setInitPipelineData(initPipelineData);
  PipelineCPDoService.setRunPipelineData(runPipelineData);

  DependencyTool.injectAllDependencies(~isDebug, ());

  POConfigCPRepo.setTransformCount(transformCount);

  CPContainerManager.setPO(CreateCPRepo.create());
};
