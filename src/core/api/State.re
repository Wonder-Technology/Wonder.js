let deepCopyForRestore = DeepCopyStateMainService.deepCopyForRestore;

let restoreState = (currentState, targetState) =>
  RestoreStateMainService.restore(StateData.stateData, currentState, targetState);

let getStateData = () => StateData.stateData;

let getState = () => StateDataMainService.getState(getStateData());

let setState = (state: StateDataType.state) =>
  StateDataMainService.setState(getStateData(), state);