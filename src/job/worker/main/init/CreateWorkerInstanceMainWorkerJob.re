open StateDataMainType;

let execJob = (_, stateData) => {
  let state = StateDataMainService.unsafeGetState(stateData);
  state.workerInstanceRecord =
    state.workerInstanceRecord
    |> WorkerInstanceService.initWorkInstances(
         OperateRenderWorkerJobService.getSetting(state.workerJobRecord).workerFileDir
       );
  /* TODO test set state */
  StateDataMainService.setState(stateData, state) |> ignore;
  Most.just(None)
};