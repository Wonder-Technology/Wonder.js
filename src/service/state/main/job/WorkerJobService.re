let getMainInitJobStream = (stateData, state: MainStateDataType.state) =>
  OperateWorkerJobService.getMainInitJobStream(
    WorkerJobHandleSystem.createMainInitJobHandleMap(),
    stateData,
    state.workerJobRecord,
    WorkerJobHandleSystem.getMainInitJobHandle
  );

let getRenderWorkerJobStreamArr =
    (pipelineJobs, workerJobs, stateData: RenderWorkerStateDataType.renderWorkerStateData) =>
  OperateWorkerJobService.getRenderWorkerJobStreamArr(
    pipelineJobs,
    workerJobs,
    WorkerJobHandleSystem.createWorkerJobHandleMap(),
    stateData,
    WorkerJobHandleSystem.getWorkerJobHandle
  );