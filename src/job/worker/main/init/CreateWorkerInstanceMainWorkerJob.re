open StateDataMainType;

let execJob = (_, stateData) => {
  let state = StateDataMainService.unsafeGetState(stateData);
  state.workerInstanceRecord =
    state.workerInstanceRecord
    |> WorkerInstanceService.initWorkInstances(
         OperateRenderWorkerJobService.getSetting(state.workerJobRecord).workerFileDir
       );
  StateDataMainService.setState(stateData, state) |> ignore;
  WonderBsMost.Most.just(None)
};