open GlobalTempType;

open StateDataMainType;

let restore = (currentState, targetState) => {
  ...targetState,
  globalTempRecord: currentState.globalTempRecord
};