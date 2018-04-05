open StateDataMainType;

let restore = (currentState, targetState) => {
  ...targetState,
  renderRecord: {basicRenderObjectRecord: None, lightRenderObjectRecord: None, cameraRecord: None}
};