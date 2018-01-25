let addLogicInitJob =
    (targetJobName: string, afterJobName: string, targetHandleFunc, state: StateDataType.state) =>
  JobSystem.addLogicInitJob(targetJobName, afterJobName, targetHandleFunc, state);

let addLogicUpdateJob =
    (targetJobName: string, afterJobName: string, targetHandleFunc, state: StateDataType.state) =>
  JobSystem.addLogicUpdateJob(targetJobName, afterJobName, targetHandleFunc, state);

let removeLogicInitJob = (targetJobName: string, state: StateDataType.state) =>
  JobSystem.removeLogicInitJob(targetJobName, state);

let removeLogicUpdateJob = (targetJobName: string, state: StateDataType.state) =>
  JobSystem.removeLogicUpdateJob(targetJobName, state);

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