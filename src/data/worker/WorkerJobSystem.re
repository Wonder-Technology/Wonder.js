let getMainInitJobStream = (stateData, state: StateDataType.state) =>
  WorkerJobConfigSystem.getMainInitJobStream(
    WorkerJobHandleSystem.createMainInitJobHandleMap(),
    stateData,
    state,
    WorkerJobHandleSystem.getMainInitJobHandle
  );

let getRenderWorkerJobStreamArr = (stateData) =>
  WorkerJobConfigSystem.getRenderWorkerJobStreamArr(
    WorkerJobHandleSystem.createWorkerJobHandleMap(),
    stateData,
    WorkerJobHandleSystem.getWorkerJobHandle
  );