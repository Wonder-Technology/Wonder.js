let addNoWorkerInitJob =
    (
      (targetJobName: string, afterJobName: string),
      action,
      targetHandleFunc,
      state: StateDataMainType.state
    ) =>
  NoWorkerJobMainService.addNoWorkerInitJob(
    (targetJobName, afterJobName),
    action,
    targetHandleFunc,
    state
  );

let addNoWorkerLoopJob =
    (
      (targetJobName: string, afterJobName: string),
      action,
      targetHandleFunc,
      state: StateDataMainType.state
    ) =>
  NoWorkerJobMainService.addNoWorkerLoopJob(
    (targetJobName, afterJobName),
    action,
    targetHandleFunc,
    state
  );

let removeNoWorkerInitJob = (targetJobName: string, state: StateDataMainType.state) =>
  NoWorkerJobMainService.removeNoWorkerInitJob(targetJobName, state);

let removeNoWorkerLoopJob = (targetJobName: string, state: StateDataMainType.state) =>
  NoWorkerJobMainService.removeNoWorkerLoopJob(targetJobName, state);

let addWorkerMainInitJob =
    (
      (targetJobName: string, afterJobName: string),
      action,
      targetHandleFunc,
      state: StateDataMainType.state
    ) =>
  WorkerJobMainService.addWorkerMainInitJob(
    (targetJobName, afterJobName),
    action,
    targetHandleFunc,
    state
  );

let removeWorkerMainInitJob = (targetJobName: string, state: StateDataMainType.state) =>
  WorkerJobMainService.removeWorkerMainInitJob(targetJobName, state);

let addWorkerMainLoopJob =
    (
      (targetJobName: string, afterJobName: string),
      action,
      targetHandleFunc,
      state: StateDataMainType.state
    ) =>
  WorkerJobMainService.addWorkerMainLoopJob(
    (targetJobName, afterJobName),
    action,
    targetHandleFunc,
    state
  );

let removeWorkerMainLoopJob = (targetJobName: string, state: StateDataMainType.state) =>
  WorkerJobMainService.removeWorkerMainLoopJob(targetJobName, state);