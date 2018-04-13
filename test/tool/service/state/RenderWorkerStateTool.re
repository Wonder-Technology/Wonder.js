let getStateData = () => StateDataRenderWorker.renderWorkerStateData;

let getState = () => StateRenderWorkerService.unsafeGetState(getStateData());

let createState = () => CreateStateRenderWorkerService.createState();

let createStateAndSetToStateData = () =>
  StateRenderWorkerService.setState(StateDataRenderWorker.renderWorkerStateData, createState());