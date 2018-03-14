/* TODO use conditional compile */
let _initWorkInstances = (workerFileDir: string, state: MainStateDataType.state) =>
  WorkerDetectMainService.isSupportRenderWorkerAndSharedArrayBuffer(state) ?
    WorkerInstanceSystem.initWorkInstances(workerFileDir, state) : state;

let initWorker = (workerFileDir: string, state: MainStateDataType.state) =>
  state |> WorkerDetectMainService.detect |> _initWorkInstances(workerFileDir);