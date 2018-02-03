let exec = (state: StateDataType.state) =>
  state
  |> InitStateJob.execJob(JobTool.getConfigData(), [@bs] DeviceManagerSystem.unsafeGetGl(state));