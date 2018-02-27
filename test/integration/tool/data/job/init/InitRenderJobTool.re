let exec = (state: StateDataType.state) =>
  state |> PregetGLSLDataTool.preparePrecision |> DirectorTool.prepare |> DirectorTool.init;


let buildNoWorkerJobConfig = () =>
  NoWorkerJobConfigTool.buildNoWorkerJobConfig(
    ~initPipelines=NoWorkerJobConfigTool.buildNoWorkerInitPipelineConfigWithoutInitMain(),
    ~initJobs=NoWorkerJobConfigTool.buildNoWorkerInitJobConfigWithoutInitMain(),
    ()
  );