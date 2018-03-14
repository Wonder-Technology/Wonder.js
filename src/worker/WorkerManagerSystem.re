/* TODO use conditional compile */
let _initWorkInstances = (workerFileDir: string, state: MainStateDataType.state) =>
  WorkerDetectSystem.isSupportRenderWorkerAndSharedArrayBuffer(state) ?
    WorkerInstanceSystem.initWorkInstances(workerFileDir, state) : state;

let initWorker = (workerFileDir: string, state: MainStateDataType.state) =>
  state |> WorkerDetectSystem.detect |> _initWorkInstances(workerFileDir);