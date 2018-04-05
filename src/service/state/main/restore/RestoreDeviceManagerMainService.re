open StateDataMainType;

let restore = (currentState, {gl}: StateDataMainType.sharedDataForRestoreState, targetState) => {
  ...targetState,
  deviceManagerRecord: {...targetState.deviceManagerRecord, gl: Some(gl)}
};