let addLogicInitJob =
    (targetJobName: string, afterJobName: string, targetHandleFunc, state: StateDataType.state) =>
  LogicJobSystem.addLogicInitJob(targetJobName, afterJobName, targetHandleFunc, state);

let addLogicUpdateJob =
    (targetJobName: string, afterJobName: string, targetHandleFunc, state: StateDataType.state) =>
  LogicJobSystem.addLogicUpdateJob(targetJobName, afterJobName, targetHandleFunc, state);

let removeLogicInitJob = (targetJobName: string, state: StateDataType.state) =>
  LogicJobSystem.removeLogicInitJob(targetJobName, state);

let removeLogicUpdateJob = (targetJobName: string, state: StateDataType.state) =>
  LogicJobSystem.removeLogicUpdateJob(targetJobName, state);

let addRenderInitJob =
    (targetJobName: string, afterJobName: string, targetHandleFunc, state: StateDataType.state) =>
  RenderJobSystem.addRenderInitJob(targetJobName, afterJobName, targetHandleFunc, state);

let addRenderRenderJob =
    (targetJobName: string, afterJobName: string, targetHandleFunc, state: StateDataType.state) =>
  RenderJobSystem.addRenderRenderJob(targetJobName, afterJobName, targetHandleFunc, state);

let removeRenderInitJob = (targetJobName: string, state: StateDataType.state) =>
  RenderJobSystem.removeRenderInitJob(targetJobName, state);

let removeRenderRenderJob = (targetJobName: string, state: StateDataType.state) =>
  RenderJobSystem.removeRenderRenderJob(targetJobName, state);