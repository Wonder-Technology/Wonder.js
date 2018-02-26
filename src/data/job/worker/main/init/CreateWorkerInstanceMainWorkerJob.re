let execJob = (_, stateData) => {
  let state = StateSystem.getState(stateData);
  state
  |> WorkerInstanceSystem.initWorkInstances(
       WorkerJobConfigSystem.getSetting(state).workerFileDir
     )
  |> StateSystem.setState(stateData)
  |> ignore;
  Most.empty()
};