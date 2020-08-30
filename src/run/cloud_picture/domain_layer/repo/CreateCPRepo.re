open CPPOType;

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
  },
  scene: {
    sceneGameObject: Js.Nullable.null,
  },
  gameObject: {
    maxUID: 0,
    transformMap: ImmutableSparseMap.createEmpty(),
  },
  transform: None,
  globalTemp: {
    float16Array1: Js.Typed_array.Float32Array.fromLength(16),
  },
  time: {
    startTime: Js.Nullable.null,
    elapsed: 0.,
  },
};
