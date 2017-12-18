let deepCopyState = StateSystem.deepCopyState;

let restoreState = (currentState, targetState) =>
  StateSystem.restore(StateData.stateData, currentState, targetState);

let getStateData = () => StateData.stateData;