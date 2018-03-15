let exec = (state: MainStateDataType.state) =>
  state
  |> InitStateJob.execJob(JobTool.getConfigRecord());