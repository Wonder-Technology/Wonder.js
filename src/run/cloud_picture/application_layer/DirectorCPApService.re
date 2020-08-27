let _injectDependencies = () => {
    TODO inject other deps!

    TODO finish jobs

  RepoDpRunAPI.set({
    sceneRepo,
    gameObjectRepo,
    transformRepo,
    globalTempRepo,
    pipelineRepo: {
      getJobExecFunc: PipelineCPRepoDp.getJobExecFunc,
      setJobExecFunc: PipelineCPRepoDp.setJobExecFunc,
      getPipelineStream: PipelineCPRepoDp.getPipelineStream,
      setPipelineStream: PipelineCPRepoDp.setPipelineStream,
    },
  });
};

let _parseAndSetPipelineStream = pipelineData => {
  pipelineData
  ->PipelineRunAPI.parsePipelineData
  ->Result.mapSuccess(((pipeline, pipelineStream)) => {
      PipelineRunAPI.setPipelineStream(pipeline, pipelineStream)
    });
};

let init = () => {
  _injectDependencies();

  JobCPDoService.registerAllJobs();

  PipelineCPDoService.getInitPipelineData()
  ->_parseAndSetPipelineStream
  ->Result.bind(() => {
      PipelineCPDoService.getRunPipelineData()
      ->_parseAndSetPipelineStream
      ->Result.mapSuccess(() => {
          PipelineCPDoService.getPipelineStream(
            PipelineCPDoService.getInitPipeline(),
          )
          ->OptionSt.map(WonderBsMost.Most.drain)
          ->ignore
        })
    });
};

let run = () => {
  PipelineCPDoService.getPipelineStream(PipelineCPDoService.getRunPipeline())
  ->OptionSt.map(WonderBsMost.Most.drain)
  ->ignore;
};
