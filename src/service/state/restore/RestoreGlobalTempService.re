open GlobalTempType;

open StateDataType;

let restore = (currentState, targetState) => {
  ...targetState,
  globalTempRecord: currentState.globalTempRecord
};