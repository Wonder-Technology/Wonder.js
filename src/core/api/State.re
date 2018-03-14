let deepCopyForRestore = DeepCopyStateMainService.deepCopyForRestore;

let restoreState = (currentState, targetState) =>
  RestoreStateMainService.restore(MainStateData.stateData, currentState, targetState);

let getStateData = () => MainStateData.stateData;

let getState = () => StateDataMainService.getState(getStateData());

let setState = (state: MainStateDataType.state) =>
  StateDataMainService.setState(getStateData(), state);