open RenderWorkerStateDataType;

let getState = (stateData) => Js.Option.getExn(stateData.state);

let setState = (stateData, state) => {
  stateData.state = Some(state);
  state
};

let createState = () => {
  gpuDetectData: {extensionInstancedArrays: None, precision: None},
  deviceManagerData: {gl: None, viewport: None}
};