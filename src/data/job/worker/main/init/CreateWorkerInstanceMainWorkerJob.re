let execJob = (_, stateData) => {
  let state = StateDataMainService.getState(stateData);
  state
  |> WorkerInstanceSystem.initWorkInstances(
       WorkerJobConfigSystem.getSetting(state).workerFileDir
     )
  |> StateDataMainService.setState(stateData)
  |> ignore;
  Most.just(None)
};