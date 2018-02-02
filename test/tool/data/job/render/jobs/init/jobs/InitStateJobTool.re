let exec = (state: StateDataType.state) =>
  state
  |> InitStateJob.getJob(JobTool.getConfigData(), [@bs] DeviceManagerSystem.unsafeGetGl(state));