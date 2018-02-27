let exec = (state: StateDataType.state) =>
  state |> PregetGLSLDataTool.preparePrecision |> DirectorTool.init;