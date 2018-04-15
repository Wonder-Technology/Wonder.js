let getStateData = () => StateDataRenderWorker.renderWorkerStateData;

let getState = () => StateRenderWorkerService.unsafeGetState(getStateData());

let setState = (state) =>
  StateRenderWorkerService.setState(StateDataRenderWorker.renderWorkerStateData, state);

let createState = () => CreateStateRenderWorkerService.createState();

let createStateAndSetToStateData = () =>
  StateRenderWorkerService.setState(StateDataRenderWorker.renderWorkerStateData, createState());