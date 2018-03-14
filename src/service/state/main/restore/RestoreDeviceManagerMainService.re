open MainStateDataType;

let restore = (currentState, {gl}: MainStateDataType.sharedDataForRestoreState, targetState) => {
  ...targetState,
  deviceManagerRecord: {...targetState.deviceManagerRecord, gl: Some(gl)}
};