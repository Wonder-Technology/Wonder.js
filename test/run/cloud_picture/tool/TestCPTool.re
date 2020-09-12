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
      (),
    ) => {
  DependencyTool.injectAllDependencies(~isDebug, ());

  CPContainerManager.setPO(CreateCPRepo.create());

  PipelineCPDoService.setInitPipelineData(initPipelineData);
  PipelineCPDoService.setUpdatePipelineData(updatePipelineData);

  POConfigCPRepo.setTransformCount(transformCount);
  POConfigCPRepo.setGeometryPointCount(geometryPointCount);
  POConfigCPRepo.setGeometryCount(geometryCount);
  POConfigCPRepo.setPBRMaterialCount(pbrMaterialCount);
  POConfigCPRepo.setDirectionLightCount(directionLightCount);

  DirectorCPTool.prepare();

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
  POConfigCPRepo.setTransformCount(transformCount);
  POConfigCPRepo.setGeometryPointCount(geometryPointCount);
  POConfigCPRepo.setGeometryCount(geometryCount);
  POConfigCPRepo.setPBRMaterialCount(pbrMaterialCount);
  POConfigCPRepo.setDirectionLightCount(directionLightCount);

  DirectorCPTool.createAndSetAllComponentPOs();
};
