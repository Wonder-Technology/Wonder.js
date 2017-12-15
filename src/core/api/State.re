let deepCopyState = StateSystem.deepCopyState;

let restoreFromState = (currentState, targetState) =>
  StateSystem.restoreFromState(StateData.stateData, currentState, targetState);

let getStateData = () => StateData.stateData;