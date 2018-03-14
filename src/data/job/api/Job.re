let addNoWorkerInitJob =
    (targetJobName: string, afterJobName: string, targetHandleFunc, state: MainStateDataType.state) =>
  NoWorkerJobSystem.addNoWorkerInitJob(targetJobName, afterJobName, targetHandleFunc, state);

let addNoWorkerLoopJob =
    (targetJobName: string, afterJobName: string, targetHandleFunc, state: MainStateDataType.state) =>
  NoWorkerJobSystem.addNoWorkerLoopJob(targetJobName, afterJobName, targetHandleFunc, state);

let removeNoWorkerInitJob = (targetJobName: string, state: MainStateDataType.state) =>
  NoWorkerJobSystem.removeNoWorkerInitJob(targetJobName, state);

let removeNoWorkerLoopJob = (targetJobName: string, state: MainStateDataType.state) =>
  NoWorkerJobSystem.removeNoWorkerLoopJob(targetJobName, state);