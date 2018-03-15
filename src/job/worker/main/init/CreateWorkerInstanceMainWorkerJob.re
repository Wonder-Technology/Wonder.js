open MainStateDataType;

let execJob = (_, stateData) => {
  let state = StateDataMainService.getState(stateData);
  {
    ...state,
    workerInstanceRecord:
      state.workerInstanceRecord
      |> WorkerInstanceService.initWorkInstances(
           OperateWorkerJobService.getSetting(state.workerJobRecord).workerFileDir
         )
  }
  |> StateDataMainService.setState(stateData)
  |> ignore;
  Most.just(None)
};