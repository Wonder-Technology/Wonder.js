let execJob = (_, stateData) =>
  MostUtils.callFunc(
    () => {
      StateSystem.getState(stateData)
      |> WorkerDetectSystem.detect
      |> StateSystem.setState(stateData)
      |> ignore;
      ()
    }
  );