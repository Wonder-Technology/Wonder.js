let deepCopyStateForRestore = StateSystem.deepCopyStateForRestore;

let restoreState = (currentState, targetState) =>
  StateSystem.restore(StateData.stateData, currentState, targetState);

let getStateData = () => StateData.stateData;