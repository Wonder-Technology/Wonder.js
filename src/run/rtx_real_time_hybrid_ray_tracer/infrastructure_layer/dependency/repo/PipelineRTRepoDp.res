open PipelineRTPOType

let getJobExecFunc = (pipelineName, jobName) =>
  RTRepo.getPipeline().jobExecFuncMap
  ->ImmutableHashMap.get(pipelineName)
  ->OptionSt.flatMap(map => map->ImmutableHashMap.get(jobName))

let setJobExecFunc = (pipelineName, jobName, execFunc) => {
  let map = switch RTRepo.getPipeline().jobExecFuncMap->ImmutableHashMap.get(pipelineName) {
  | None => ImmutableHashMap.createEmpty()
  | Some(map) => map
  }

  RTRepo.setPipeline({
    ...RTRepo.getPipeline(),
    jobExecFuncMap: RTRepo.getPipeline().jobExecFuncMap->ImmutableHashMap.set(
      pipelineName,
      map->ImmutableHashMap.set(jobName, execFunc),
    ),
  })
}

let getPipelineStream = pipeline =>
  RTRepo.getPipeline().pipelineStreamMap->ImmutableHashMap.get(pipeline)

let setPipelineStream = (pipeline, stream) => {
  let {pipelineStreamMap} as pipelinePO = RTRepo.getPipeline()

  RTRepo.setPipeline({
    ...pipelinePO,
    pipelineStreamMap: pipelineStreamMap->ImmutableHashMap.set(pipeline, stream),
  })
}
