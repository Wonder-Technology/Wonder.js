open PipelineCPPOType

let getJobExecFunc = (pipelineName, jobName) =>
  CPRepo.getPipeline().jobExecFuncMap
  ->ImmutableHashMap.get(pipelineName)
  ->OptionSt.flatMap(map => map->ImmutableHashMap.get(jobName))

let setJobExecFunc = (pipelineName, jobName, execFunc) => {
  let map = switch CPRepo.getPipeline().jobExecFuncMap->ImmutableHashMap.get(pipelineName) {
  | None => ImmutableHashMap.createEmpty()
  | Some(map) => map
  }

  CPRepo.setPipeline({
    ...CPRepo.getPipeline(),
    jobExecFuncMap: CPRepo.getPipeline().jobExecFuncMap->ImmutableHashMap.set(
      pipelineName,
      map->ImmutableHashMap.set(jobName, execFunc),
    ),
  })
}

let getPipelineStream = pipeline =>
  CPRepo.getPipeline().pipelineStreamMap->ImmutableHashMap.get(pipeline)

let setPipelineStream = (pipeline, stream) => {
  let {pipelineStreamMap} as pipelinePO = CPRepo.getPipeline()

  CPRepo.setPipeline({
    ...pipelinePO,
    pipelineStreamMap: pipelineStreamMap->ImmutableHashMap.set(pipeline, stream),
  })
}
