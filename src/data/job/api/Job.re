let addNoWorkerInitJob =
    (targetJobName: string, afterJobName: string, targetHandleFunc, state: StateDataType.state) =>
  NoWorkerJobSystem.addNoWorkerInitJob(targetJobName, afterJobName, targetHandleFunc, state);

let addNoWorkerLoopJob =
    (targetJobName: string, afterJobName: string, targetHandleFunc, state: StateDataType.state) =>
  NoWorkerJobSystem.addNoWorkerLoopJob(targetJobName, afterJobName, targetHandleFunc, state);

let removeNoWorkerInitJob = (targetJobName: string, state: StateDataType.state) =>
  NoWorkerJobSystem.removeNoWorkerInitJob(targetJobName, state);

let removeNoWorkerLoopJob = (targetJobName: string, state: StateDataType.state) =>
  NoWorkerJobSystem.removeNoWorkerLoopJob(targetJobName, state);

/* let addRenderInitJob =
    (targetJobName: string, afterJobName: string, targetHandleFunc, state: StateDataType.state) =>
  RenderJobSystem.addRenderInitJob(targetJobName, afterJobName, targetHandleFunc, state);

let addRenderRenderJob =
    (targetJobName: string, afterJobName: string, targetHandleFunc, state: StateDataType.state) =>
  RenderJobSystem.addRenderRenderJob(targetJobName, afterJobName, targetHandleFunc, state);

let removeRenderInitJob = (targetJobName: string, state: StateDataType.state) =>
  RenderJobSystem.removeRenderInitJob(targetJobName, state);

let removeRenderRenderJob = (targetJobName: string, state: StateDataType.state) =>
  RenderJobSystem.removeRenderRenderJob(targetJobName, state); */