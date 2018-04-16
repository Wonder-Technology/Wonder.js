let getMainInitJobStream =
    (stateData, (createJobHandleMapFunc, getJobHandleFunc), state: StateDataMainType.state) =>
  OperateMainInitWorkerJobService.getMainInitJobStream(
    createJobHandleMapFunc(),
    stateData,
    state.workerJobRecord,
    getJobHandleFunc
  );

let getMainLoopJobStream =
    (stateData, (createJobHandleMapFunc, getJobHandleFunc), state: StateDataMainType.state) =>
  OperateMainLoopWorkerJobService.getMainLoopJobStream(
    createJobHandleMapFunc(),
    stateData,
    state.workerJobRecord,
    getJobHandleFunc
  );

let getRenderWorkerJobStreamArr =
    (
      pipelineJobs,
      workerJobs,
      (createJobHandleMapFunc, getJobHandleFunc),
      stateData: StateDataRenderWorkerType.renderWorkerStateData
    ) =>
  OperateRenderWorkerJobService.getRenderWorkerJobStreamArr(
    pipelineJobs,
    workerJobs,
    createJobHandleMapFunc(),
    stateData,
    getJobHandleFunc
  );