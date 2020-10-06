let init =
    (
      ~sandbox,
      ~isDebug=true,
      ~transformCount=10,
      ~geometryPointCount=10,
      ~geometryCount=10,
      ~pbrMaterialCount=10,
      ~directionLightCount=2,
      ~initPipelineData=PipelineTool.buildEmptyPipelineData(),
      ~updatePipelineData=PipelineTool.buildEmptyPipelineData(),
      ~renderPipelineData=PipelineTool.buildEmptyPipelineData(),
      (),
    ) => {
  DependencyTool.injectAllDependencies(
    ~isDebug,
    ~transformCount,
    ~geometryPointCount,
    ~geometryCount,
    ~pbrMaterialCount,
    ~directionLightCount,
    (),
  );

  CPContainerManager.setPO(CreateCPRepo.create());

  PipelineCPDoService.setInitPipelineData(initPipelineData);
  PipelineCPDoService.setUpdatePipelineData(updatePipelineData);
  PipelineCPDoService.setRenderPipelineData(renderPipelineData);

  DirectorCPTool.prepare(
    ~transformCount,
    ~geometryPointCount,
    ~geometryCount,
    ~pbrMaterialCount,
    ~directionLightCount,
    (),
  );

  WebGPUDependencyTool.build(~sandbox, ())->WebGPUDependencyTool.set;
  WebGPURayTracingDependencyTool.build(~sandbox, ())
  ->WebGPURayTracingDependencyTool.set;
};

let updateBufferCount =
    (
      ~transformCount=10,
      ~geometryPointCount=10,
      ~geometryCount=10,
      ~pbrMaterialCount=10,
      ~directionLightCount=2,
      (),
    ) => {
  POConfigTool.setAllCount(
    ~transformCount,
    ~geometryPointCount,
    ~geometryCount,
    ~pbrMaterialCount,
    ~directionLightCount,
    (),
  );

  DirectorCPTool.createAndSetAllComponentPOs();
};
