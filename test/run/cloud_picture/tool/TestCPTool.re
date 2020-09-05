let init =
    (
      ~sandbox,
      ~isDebug=true,
      ~transformCount=10,
      ~initPipelineData=PipelineTool.buildEmptyPipelineData(),
      ~updatePipelineData=PipelineTool.buildEmptyPipelineData(),
      (),
    ) => {
  DependencyTool.injectAllDependencies(~isDebug, ());

  POConfigCPRepo.setTransformCount(transformCount);

  CPContainerManager.setPO(CreateCPRepo.create());

  PipelineCPDoService.setInitPipelineData(initPipelineData);
  PipelineCPDoService.setUpdatePipelineData(updatePipelineData);

  DirectorCPTool.prepare();
};
