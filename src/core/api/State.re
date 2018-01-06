let deepCopyStateForRestore = StateSystem.deepCopyStateForRestore;

let restoreState = (currentState, targetState) =>
  StateSystem.restore(StateData.stateData, currentState, targetState);

let getStateData = () => StateData.stateData;

let getState = () => StateSystem.getState(getStateData());

let setState = (state: StateDataType.state) => StateSystem.setState(getStateData(), state);