open CPPOType;

open BasicCameraViewCPPOType;

let create = () => {
  pipeline: {
    initPipeline: "init",
    runPipeline: "run",
    initPipelineData: {
      name: "init",
      firstGroup: "frame",
      groups: [
        {
          name: "frame",
          link: Concat,
          elements: [{name: "start_time", type_: Job}],
        },
      ],
    },
    runPipelineData: {
      name: "run",
      firstGroup: "frame",
      groups: [
        {
          name: "frame",
          link: Concat,
          elements: [{name: "update_transform", type_: Job}],
        },
      ],
    },
    pipelineStreamMap: ImmutableHashMap.createEmpty(),
    jobExecFuncMap: ImmutableHashMap.createEmpty(),
  },
  poConfig: {
    transformCount: 10000,
    pbrMaterialCount: 10000,
    geometryPointCount: 2000000,
    geometryCount: 10000,
    directionLightCount: 4,
  },
  scene: {
    sceneGameObject: Js.Nullable.null,
  },
  gameObject: {
    maxUID: 0,
    transformMap: ImmutableSparseMap.createEmpty(),
    pbrMaterialMap: ImmutableSparseMap.createEmpty(),
    geometryMap: ImmutableSparseMap.createEmpty(),
    directionLightMap: ImmutableSparseMap.createEmpty(),
    basicCameraViewMap: ImmutableSparseMap.createEmpty(),
    perspectiveCameraProjectionMap: ImmutableSparseMap.createEmpty(),
  },
  transform: None,
  pbrMaterial: None,
  geometry: None,
  directionLight: None,
  basicCameraView: {
    maxIndex: 0,
    isActiveMap: ImmutableSparseMap.createEmpty(),
    gameObjectMap: ImmutableSparseMap.createEmpty(),
  },
  perspectiveCameraProjection: {
    maxIndex: 0,
    gameObjectMap: ImmutableSparseMap.createEmpty(),
    dirtyList: [],
    pMatrixMap: ImmutableSparseMap.createEmpty(),
    nearMap: ImmutableSparseMap.createEmpty(),
    farMap: ImmutableSparseMap.createEmpty(),
    fovyMap: ImmutableSparseMap.createEmpty(),
    aspectMap: ImmutableSparseMap.createEmpty(),
  },
  globalTemp: {
    float16Array1: Js.Typed_array.Float32Array.fromLength(16),
  },
  time: {
    startTime: Js.Nullable.null,
    elapsed: 0.,
  },
  picture: {
    size: None,
  },
  webgpu: {
    device: None,
    adapter: None,
    context: None,
    queue: None,
    swapChainFormat: None,
    swapChain: None,
  },
  camera: {
    cameraBufferData: None,
  },
};
