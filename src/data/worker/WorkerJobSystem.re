let getMainInitJobStream = (stateData, state: MainStateDataType.state) =>
  WorkerJobConfigSystem.getMainInitJobStream(
    WorkerJobHandleSystem.createMainInitJobHandleMap(),
    stateData,
    state,
    WorkerJobHandleSystem.getMainInitJobHandle
  );

let getRenderWorkerJobStreamArr = (pipelineJobs, workerJobs, stateData) =>
  WorkerJobConfigSystem.getRenderWorkerJobStreamArr(
    pipelineJobs,
    workerJobs,
    WorkerJobHandleSystem.createWorkerJobHandleMap(),
    stateData,
    WorkerJobHandleSystem.getWorkerJobHandle
  );