open GlobalTempType;

open MainStateDataType;

let restore = (currentState, targetState) => {
  ...targetState,
  globalTempRecord: currentState.globalTempRecord
};