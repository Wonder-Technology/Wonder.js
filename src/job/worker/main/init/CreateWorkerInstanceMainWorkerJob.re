open StateDataMainType;

let execJob = (_, stateData) => {
  let state = StateDataMainService.getState(stateData);
  state.workerInstanceRecord =
    state.workerInstanceRecord
    |> WorkerInstanceService.initWorkInstances(
         OperateRenderWorkerJobService.getSetting(state.workerJobRecord).workerFileDir
       );
  Most.just(None)
};