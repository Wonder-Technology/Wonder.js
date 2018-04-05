let addNoWorkerInitJob =
    (targetJobName: string, afterJobName: string, targetHandleFunc, state: StateDataMainType.state) =>
  NoWorkerJobService.addNoWorkerInitJob(targetJobName, afterJobName, targetHandleFunc, state);

let addNoWorkerLoopJob =
    (targetJobName: string, afterJobName: string, targetHandleFunc, state: StateDataMainType.state) =>
  NoWorkerJobService.addNoWorkerLoopJob(targetJobName, afterJobName, targetHandleFunc, state);

let removeNoWorkerInitJob = (targetJobName: string, state: StateDataMainType.state) =>
  NoWorkerJobService.removeNoWorkerInitJob(targetJobName, state);

let removeNoWorkerLoopJob = (targetJobName: string, state: StateDataMainType.state) =>
  NoWorkerJobService.removeNoWorkerLoopJob(targetJobName, state);