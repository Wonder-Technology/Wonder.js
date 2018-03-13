open StateDataType;

let restore = (currentState, {gl}: StateDataType.sharedDataForRestoreState, targetState) => {
  ...targetState,
  deviceManagerRecord: {...targetState.deviceManagerRecord, gl: Some(gl)}
};