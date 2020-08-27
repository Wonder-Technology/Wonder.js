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
};
