let pregetGLSLData = (state) =>
  state
  |> PregetGLSLDataTool.preparePrecision
  |> PregetGLSLDataJob.execJob(JobTool.getConfigRecord());

let prepareForInit = (state) => state |> pregetGLSLData;