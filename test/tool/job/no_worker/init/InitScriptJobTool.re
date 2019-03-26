let exec = (state: StateDataMainType.state) =>
  state |> InitScriptJob.execJob(JobTool.getConfigRecord());