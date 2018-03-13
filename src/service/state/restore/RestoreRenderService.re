open StateDataType;

let restore = (currentState, targetState) => {
  ...targetState,
  renderRecord: {renderArray: None, cameraData: None}
};