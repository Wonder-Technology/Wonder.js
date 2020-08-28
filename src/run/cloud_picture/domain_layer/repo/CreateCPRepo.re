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
          elements: [{name: "create_all_po_ecs_buffers", type_: Job}],
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
};
