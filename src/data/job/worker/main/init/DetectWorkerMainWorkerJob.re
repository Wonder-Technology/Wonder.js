let execJob = (_, stateData) =>
  MostUtils.callFunc(
    () => {
      StateDataMainService.getState(stateData)
      |> WorkerDetectSystem.detect
      |> StateDataMainService.setState(stateData)
      |> ignore;
      None
    }
  );