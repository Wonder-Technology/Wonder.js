let deepCopyState = StateSystem.deepCopyState;

let restoreFromState = (targetState) =>
  StateSystem.restoreFromState(StateData.stateData, targetState);

let getStateData = () => StateData.stateData;