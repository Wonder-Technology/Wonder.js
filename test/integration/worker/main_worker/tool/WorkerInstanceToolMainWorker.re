open MainStateDataType;

let setRenderWorker = WorkerInstanceService._setRenderWorker;

let unsafeGetRenderWorker = (state) =>
  WorkerInstanceService.unsafeGetRenderWorker(state.workerInstanceRecord);