open StateDataMainType;

let setRenderWorker = WorkerInstanceService._setRenderWorker;

let unsafeGetRenderWorker = (state) =>
  WorkerInstanceService.unsafeGetRenderWorker(state.workerInstanceRecord);