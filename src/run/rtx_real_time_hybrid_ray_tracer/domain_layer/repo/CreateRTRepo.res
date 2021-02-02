open RTPOType

let create = () => {
  pipeline: {
    initPipeline: "init",
    updatePipeline: "update",
    renderPipeline: "render",
    initPipelineData: {
      name: "init",
      firstGroup: "frame",
      groups: list{
        {
          name: "frame",
          link: Concat,
          elements: list{
            {name: "start_time", type_: Job},
            {name: "init_webgpu", type_: Job},
            {name: "init_camera", type_: Job},
            {name: "init_pass", type_: Job},
            {name: "init_pathTracing_pass", type_: Job},
            {name: "init_bmfr_regression_pass", type_: Job},
            {name: "init_accumulation_pass", type_: Job},
          },
        },
      },
    },
    updatePipelineData: {
      name: "update",
      firstGroup: "frame",
      groups: list{
        {
          name: "frame",
          link: Concat,
          elements: list{
            {name: "update_camera", type_: Job},
            {name: "update_textureArray", type_: Job},
            {name: "update_pathTracing_pass", type_: Job},
            {name: "update_pass", type_: Job},
          },
        },
      },
    },
    renderPipelineData: {
      name: "render",
      firstGroup: "frame",
      groups: list{
        {
          name: "frame",
          link: Concat,
          elements: list{
            {name: "render_pathTracing_pass", type_: Job},
            {name: "render_bmfr_regression_pass", type_: Job},
            {name: "update_bmfr_regression_pass", type_: Job},
            {name: "update_accumulation_pass", type_: Job},
            {name: "update_pass_for_render", type_: Job},
            {name: "render_accumulation_pass", type_: Job},
            {name: "end_render", type_: Job},
          },
        },
      },
    },
    pipelineStreamMap: ImmutableHashMap.createEmpty(),
    jobExecFuncMap: ImmutableHashMap.createEmpty(),
  },
  time: {
    startTime: None,
    elapsed: 0.,
  },
  picture: {
    size: None,
  },
  webgpu: {
    device: None,
    window: None,
    adapter: None,
    context: None,
    queue: None,
    swapChainFormat: None,
    swapChain: None,
    textureArray: {
      layerIndexMap: ImmutableHashMap.createEmpty(),
      textureArrayView: None,
      textureSampler: None,
      layerSize: (2048, 2048),
    },
  },
  camera: {
    cameraBufferData: None,
  },
  pass: {
    sampleCount: 1,
    totalSampleCount: 0,
    commonBufferData: None,
    resolutionBufferData: None,
    pixelBufferData: None,
    bmfrDataBufferData: None,
  },
  pathTracingPass: {
    sceneDescBufferData: None,
    pointIndexBufferData: None,
    vertexBufferData: None,
    indexBufferData: None,
    bsdfMaterialBufferData: None,
    shaderBindingTable: None,
    staticBindGroupDataList: list{},
    pipeline: None,
    cameraBindGroupLayout: None,
    directionLightBindGroupLayout: None,
  },
  bmfrRegressionPass: {
    frameIndex: 0,
    commonBufferData: None,
    staticBindGroupData: None,
    pipeline: None,
  },
  accumulationPass: {
    accumulationPixelBufferData: None,
    staticBindGroupData: None,
    pipeline: None,
  },
}
