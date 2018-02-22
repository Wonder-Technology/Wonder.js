let execJob = (_, stateData) =>
  MostUtils.callFunc(
    () => {
      let state = StateSystem.getState(stateData);
      state
      |> WorkerInstanceSystem.initWorkInstances(
           WorkerJobConfigSystem.getWorkerSetting(state).workerFileDir
         )
      |> StateSystem.setState(stateData)
      |> ignore;
      ()
    }
  );