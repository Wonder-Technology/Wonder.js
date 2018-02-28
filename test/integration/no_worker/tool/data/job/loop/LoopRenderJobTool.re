let buildNoWorkerJobConfig = () =>
  NoWorkerJobConfigTool.buildNoWorkerJobConfig(
    ~initPipelines=NoWorkerJobConfigTool.buildNoWorkerInitPipelineConfigWithoutInitMain(),
    ~initJobs=NoWorkerJobConfigTool.buildNoWorkerInitJobConfigWithoutInitMain(),
    ~loopPipelines=NoWorkerJobConfigTool.buildNoWorkerLoopPipelineConfig(),
    ~loopJobs=NoWorkerJobConfigTool.buildNoWorkerLoopJobConfig(),
    ()
  );