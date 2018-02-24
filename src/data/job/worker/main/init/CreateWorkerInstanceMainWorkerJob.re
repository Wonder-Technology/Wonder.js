let execJob = (_, stateData) => {
  let state = StateSystem.getState(stateData);
  state
  |> WorkerInstanceSystem.initWorkInstances(
       WorkerJobConfigSystem.getWorkerSetting(state).workerFileDir
     )
  |> StateSystem.setState(stateData)
  |> ignore;
  Most.empty()
};