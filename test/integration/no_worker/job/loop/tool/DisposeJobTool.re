let disposeAndReallocate = state =>
  state |> DisposeJob.execJob(None) |> ReallocateMemoryTool.reallocateAll;