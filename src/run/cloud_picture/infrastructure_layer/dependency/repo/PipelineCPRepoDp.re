let getJobExecFunc = (pipelineName, jobName) => {
  switch (
    Repo.getPipeline().jobExecFuncMap->ImmutableHashMap.get(pipelineName)
  ) {
  | None => Js.Nullable.null
  | Some(map) => map->ImmutableHashMap.getNullable(jobName)
  };
};

let setJobExecFunc = (pipelineName, jobName, execFunc) => {
  let map =
    switch (
      Repo.getPipeline().jobExecFuncMap->ImmutableHashMap.get(pipelineName)
    ) {
    | None => ImmutableHashMap.createEmpty()
    | Some(map) => map
    };

  map->ImmutableHashMap.set(jobName, execFunc)->ignore;
};

let getPipelineStream = pipeline => {
  Repo.getPipeline().pipelineStreamMap->ImmutableHashMap.get(pipeline);
};

let setPipelineStream = (pipeline, stream) => {
  Repo.getPipeline().pipelineStreamMap->ImmutableHashMap.set(pipeline);
};
