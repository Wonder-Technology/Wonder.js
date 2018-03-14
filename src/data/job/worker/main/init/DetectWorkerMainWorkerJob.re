let execJob = (_, stateData) =>
  MostUtils.callFunc(
    () => {
      StateDataMainService.getState(stateData)
      |> WorkerDetectMainService.detect
      |> StateDataMainService.setState(stateData)
      |> ignore;
      None
    }
  );