let deepCopyForRestore = DeepCopyStateMainService.deepCopyForRestore;

let restoreState = (currentState, targetState) =>
  RestoreStateMainService.restore(StateDataMain.stateData, currentState, targetState);

let getStateData = () => StateDataMain.stateData;

let createStateData = () => CreateStateDataMainService.createStateData();

let getState = () => StateDataMainService.getState(getStateData());

let getStateFromData = (stateData) => StateDataMainService.getState(stateData);

let createState = () => CreateStateMainService.createState();

let setState = (state: StateDataMainType.state) =>
  StateDataMainService.setState(getStateData(), state);

let setStateToData = (stateData, state: StateDataMainType.state) =>
  StateDataMainService.setState(stateData, state);

let setIsDebug = (isDebug) => IsDebugMainService.setIsDebug(getStateData(), isDebug);