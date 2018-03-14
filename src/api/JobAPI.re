let addNoWorkerInitJob =
    (targetJobName: string, afterJobName: string, targetHandleFunc, state: MainStateDataType.state) =>
  NoWorkerJobService.addNoWorkerInitJob(targetJobName, afterJobName, targetHandleFunc, state);

let addNoWorkerLoopJob =
    (targetJobName: string, afterJobName: string, targetHandleFunc, state: MainStateDataType.state) =>
  NoWorkerJobService.addNoWorkerLoopJob(targetJobName, afterJobName, targetHandleFunc, state);

let removeNoWorkerInitJob = (targetJobName: string, state: MainStateDataType.state) =>
  NoWorkerJobService.removeNoWorkerInitJob(targetJobName, state);

let removeNoWorkerLoopJob = (targetJobName: string, state: MainStateDataType.state) =>
  NoWorkerJobService.removeNoWorkerLoopJob(targetJobName, state);