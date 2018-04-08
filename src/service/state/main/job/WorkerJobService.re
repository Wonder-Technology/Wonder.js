let getMainInitJobStream = (stateData, state: StateDataMainType.state) =>
  OperateMainInitWorkerJobService.getMainInitJobStream(
    WorkerJobHandleSystem.createMainInitJobHandleMap(),
    stateData,
    state.workerJobRecord,
    WorkerJobHandleSystem.getMainInitJobHandle
  );

let getMainLoopJobStream = (stateData, state: StateDataMainType.state) =>
  OperateMainLoopWorkerJobService.getMainLoopJobStream(
    WorkerJobHandleSystem.createMainLoopJobHandleMap(),
    stateData,
    state.workerJobRecord,
    WorkerJobHandleSystem.getMainLoopJobHandle
  );

let getRenderWorkerJobStreamArr =
    (pipelineJobs, workerJobs, stateData: StateDataRenderWorkerType.renderWorkerStateData) =>
  OperateRenderWorkerJobService.getRenderWorkerJobStreamArr(
    pipelineJobs,
    workerJobs,
    WorkerJobHandleSystem.createWorkerJobHandleMap(),
    stateData,
    WorkerJobHandleSystem.getWorkerJobHandle
  );