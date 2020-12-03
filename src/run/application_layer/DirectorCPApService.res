let _injectDependencies = () => {
  PipelineRepoDpRunAPI.set({
    getJobExecFunc: PipelineCPRepoDp.getJobExecFunc,
    setJobExecFunc: PipelineCPRepoDp.setJobExecFunc,
    getPipelineStream: PipelineCPRepoDp.getPipelineStream,
    setPipelineStream: PipelineCPRepoDp.setPipelineStream,
  })

  TimeRepoDpRunAPI.set({
    start: TimeCPRepoDp.start,
    getElapsed: TimeCPRepoDp.getElapsed,
  })
}

let prepare = (~pictureSize, ~sampleCount) => {
  _injectDependencies()

  PictureCPDoService.setSize(pictureSize)
  PassCPDoService.setSampleCount(sampleCount)
}

let _parseAndSetPipelineStream = pipelineData => pipelineData->PipelineRunAPI.parsePipelineData

let init = () => {
  JobCPDoService.registerAllJobs()

  PipelineCPDoService.getInitPipelineData()->_parseAndSetPipelineStream
}

let update = () => PipelineCPDoService.getUpdatePipelineData()->_parseAndSetPipelineStream

let render = () => PipelineCPDoService.getRenderPipelineData()->_parseAndSetPipelineStream
