open MainStateDataType;

let restore = (currentState, targetState) => {
  ...targetState,
  /* TODO test */
  renderRecord: {renderArray: None, basicRenderObjectRecord: None, cameraRecord: None}
};