open CPPOType;

let create = () => {
  pipeline: {
    initPipeline: "init",
    updatePipeline: "update",
    // renderPipeline: "render",
    initPipelineData: {
      name: "init",
      firstGroup: "frame",
      groups: [
        {
          name: "frame",
          link: Concat,
          elements: [
            {name: "start_time", type_: Job},
            {name: "init_webgpu", type_: Job},
            {name: "init_camera", type_: Job},
            // {name: "init_pass", type_: Job},
            // {name: "init_pathTracing", type_: Job},
            // {name: "init_accumulation", type_: Job},
          ],
        },
      ],
    },
    updatePipelineData: {
      name: "update",
      firstGroup: "frame",
      groups: [
        {
          name: "frame",
          link: Concat,
          elements: [
            {name: "update_camera", type_: Job},
            // {name: "update_textureArray", type_: Job},
            // {name: "update_pathTracing", type_: Job},
            // {name: "update_pass", type_: Job},
          ],
        },
      ],
    },
    // renderPipelineData: {
    //   name: "render",
    //   firstGroup: "frame",
    //   groups: [
    //     {
    //       name: "frame",
    //       link: Concat,
    //       elements: [
    //         {name: "render_pathTracing", type_: Job},
    //         {name: "update_accumulation", type_: Job},
    //         {name: "update_pass_for_render", type_: Job},
    //         {name: "render_accumulation", type_: Job},
    //         {name: "end_render", type_: Job},
    //       ],
    //     },
    //   ],
    // },
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
    // textureArray: {
    //   layerIndexMap: ImmutableHashMap.createEmpty(),
    //   textureArrayView: None,
    //   textureSampler: None,
    // },
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
  },
  pathTracingPass: {
    sceneDescBufferData: None,
    pointIndexBufferData: None,
    vertexBufferData: None,
    indexBufferData: None,
    bsdfMaterialBufferData: None,
    shaderBindingTable: None,
    staticBindGroupDataList: [],
    pipeline: None,
    cameraBindGroupLayout: None,
    directionLightBindGroupLayout: None,
  },
  accumulationPass: {
    accumulationPixelBufferData: None,
    staticBindGroupData: None,
    pipeline: None,
  },
  // image: {
  //   dataMap: ImmutableHashMap.createEmpty(),
  // },
};
