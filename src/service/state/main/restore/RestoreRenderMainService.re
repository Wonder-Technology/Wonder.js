open MainStateDataType;

let restore = (currentState, targetState) => {
  ...targetState,
  renderRecord: {basicRenderObjectRecord: None, lightRenderObjectRecord: None, cameraRecord: None}
};