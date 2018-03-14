open MainStateDataType;

let execJob = (_, stateData) => {
  let state = StateDataMainService.getState(stateData);
  state
  |> WorkerInstanceSystem.initWorkInstances(
       OperateWorkerJobService.getSetting(state.workerJobRecord).workerFileDir
     )
  |> StateDataMainService.setState(stateData)
  |> ignore;
  Most.just(None)
};