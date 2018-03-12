let pregetGLSLData = (state) =>
  state
  |> PregetGLSLDataTool.preparePrecision
  |> PregetGLSLDataJob.execJob(JobTool.getConfigData());

let prepareForInit = (state) => state |> pregetGLSLData;