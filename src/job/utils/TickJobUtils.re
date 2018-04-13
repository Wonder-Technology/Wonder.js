let execJob = (timeControllerRecord) =>
  timeControllerRecord
  |> TimeControllerService.tick(TimeControllerService.getElapsed(timeControllerRecord));