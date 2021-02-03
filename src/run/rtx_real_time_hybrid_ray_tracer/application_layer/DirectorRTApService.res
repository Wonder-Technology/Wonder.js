let _injectDependencies = () => {
  PipelineRepoDpRunAPI.set({
    getJobExecFunc: PipelineRTRepoDp.getJobExecFunc,
    setJobExecFunc: PipelineRTRepoDp.setJobExecFunc,
    getPipelineStream: PipelineRTRepoDp.getPipelineStream,
    setPipelineStream: PipelineRTRepoDp.setPipelineStream,
  })

  TimeRepoDpRunAPI.set({
    start: TimeRTRepoDp.start,
    getElapsed: TimeRTRepoDp.getElapsed,
  })
}

let prepare = (~pictureSize) => {
  _injectDependencies()

  PictureRTDoService.setSize(pictureSize)

  PassRTDoService.setSampleCount(1)
}

let _parseAndSetPipelineStream = pipelineData => pipelineData->PipelineRunAPI.parsePipelineData

let init = () => {
  JobRTDoService.registerAllJobs()

  PipelineRTDoService.getInitPipelineData()->_parseAndSetPipelineStream
}

let update = () => PipelineRTDoService.getUpdatePipelineData()->_parseAndSetPipelineStream

let render = () => PipelineRTDoService.getRenderPipelineData()->_parseAndSetPipelineStream
