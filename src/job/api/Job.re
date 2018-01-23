let addRenderInitJob =
    (targetJobName: string, afterJobName: string, targetHandleFunc, state: StateDataType.state) =>
  JobSystem.addRenderInitJob(targetJobName, afterJobName, targetHandleFunc, state);

let addRenderRenderJob =
    (targetJobName: string, afterJobName: string, targetHandleFunc, state: StateDataType.state) =>
  JobSystem.addRenderRenderJob(targetJobName, afterJobName, targetHandleFunc, state);

let removeRenderInitJob = (targetJobName: string, state: StateDataType.state) =>
  JobSystem.removeRenderInitJob(targetJobName, state);

let removeRenderRenderJob = (targetJobName: string, state: StateDataType.state) =>
  JobSystem.removeRenderRenderJob(targetJobName, state);