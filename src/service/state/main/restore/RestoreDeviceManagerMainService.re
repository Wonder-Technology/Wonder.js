open StateDataMainType;

let restore = (currentState, targetState) => {
  ...targetState,
  deviceManagerRecord: currentState.deviceManagerRecord,
};