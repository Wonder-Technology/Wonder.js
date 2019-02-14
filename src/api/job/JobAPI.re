let registerNoWorkerInitJob =
    (jobName, handleFunc, state: StateDataMainType.state) =>
  NoWorkerJobMainService.registerNoWorkerInitJob(jobName, handleFunc, state);

let registerNoWorkerLoopJob =
    (jobName, handleFunc, state: StateDataMainType.state) =>
  NoWorkerJobMainService.registerNoWorkerLoopJob(jobName, handleFunc, state);

let addNoWorkerInitJob =
    (
      (targetJobName: string, sourceJobName: string),
      action,
      targetHandleFunc,
      state: StateDataMainType.state,
    ) =>
  NoWorkerJobMainService.addNoWorkerInitJob(
    (targetJobName, sourceJobName),
    action,
    targetHandleFunc,
    state,
  );

let addNoWorkerLoopJob =
    (
      (targetJobName: string, sourceJobName: string),
      action,
      targetHandleFunc,
      state: StateDataMainType.state,
    ) =>
  NoWorkerJobMainService.addNoWorkerLoopJob(
    (targetJobName, sourceJobName),
    action,
    targetHandleFunc,
    state,
  );

let removeNoWorkerInitJob =
    (targetJobName: string, state: StateDataMainType.state) =>
  NoWorkerJobMainService.removeNoWorkerInitJob(targetJobName, state);

let removeNoWorkerLoopJob =
    (targetJobName: string, state: StateDataMainType.state) =>
  NoWorkerJobMainService.removeNoWorkerLoopJob(targetJobName, state);

let addWorkerMainInitJob =
    (
      (targetJobName: string, sourceJobName: string),
      action,
      targetHandleFunc,
      state: StateDataMainType.state,
    ) =>
  WorkerJobMainService.addWorkerMainInitJob(
    (targetJobName, sourceJobName),
    action,
    targetHandleFunc,
    state,
  );

let removeWorkerMainInitJob =
    (targetJobName: string, state: StateDataMainType.state) =>
  WorkerJobMainService.removeWorkerMainInitJob(targetJobName, state);

let addWorkerMainLoopJob =
    (
      (targetJobName: string, sourceJobName: string),
      action,
      targetHandleFunc,
      state: StateDataMainType.state,
    ) =>
  WorkerJobMainService.addWorkerMainLoopJob(
    (targetJobName, sourceJobName),
    action,
    targetHandleFunc,
    state,
  );

let removeWorkerMainLoopJob =
    (targetJobName: string, state: StateDataMainType.state) =>
  WorkerJobMainService.removeWorkerMainLoopJob(targetJobName, state);