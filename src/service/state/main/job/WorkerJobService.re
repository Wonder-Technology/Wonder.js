let getMainInitJobStream = (stateData, state: MainStateDataType.state) =>
  OperateMainInitWorkerJobService.getMainInitJobStream(
    WorkerJobHandleSystem.createMainInitJobHandleMap(),
    stateData,
    state.workerJobRecord,
    WorkerJobHandleSystem.getMainInitJobHandle
  );

let getRenderWorkerJobStreamArr =
    (pipelineJobs, workerJobs, stateData: RenderWorkerStateDataType.renderWorkerStateData) =>
  OperateRenderWorkerJobService.getRenderWorkerJobStreamArr(
    pipelineJobs,
    workerJobs,
    WorkerJobHandleSystem.createWorkerJobHandleMap(),
    stateData,
    WorkerJobHandleSystem.getWorkerJobHandle
  );