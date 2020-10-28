let init =
    (
      ~sandbox,
      ~isDebug=true,
      ~initPipelineData=PipelineTool.buildEmptyPipelineData(),
      //   ~updatePipelineData=PipelineTool.buildEmptyPipelineData(),
      //   ~renderPipelineData=PipelineTool.buildEmptyPipelineData(),
      (),
    ) => {
  DependencyTool.injectAllDependencies(~isDebug, ());

  CPContainerManager.setPO(CreateCPRepo.create());

  PipelineCPDoService.setInitPipelineData(initPipelineData);
  //   PipelineCPDoService.setUpdatePipelineData(updatePipelineData);
  //   PipelineCPDoService.setRenderPipelineData(renderPipelineData);

  DirectorCPTool.prepare();
  //   WebGPUDependencyTool.build(~sandbox, ())->WebGPUDependencyTool.set;
  //   WebGPURayTracingDependencyTool.build(~sandbox, ())
  //   ->WebGPURayTracingDependencyTool.set;
};
