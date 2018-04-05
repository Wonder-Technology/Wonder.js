let exec = (state: StateDataMainType.state) =>
  state
  |> InitStateJob.execJob(JobTool.getConfigRecord());