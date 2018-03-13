open RenderWorkerStateDataType;

let setState = (stateData, state) => {
  stateData.state = Some(state);
  state
};

let createState = () => {
  jobData: None,
  gpuDetectData: {extensionInstancedArrays: None, precision: None},
  /* deviceManagerRecord: {gl: None, viewport: None} */
  deviceManagerRecord: RecordDeviceManagerService.create()
};

/* let getState = (stateData) => Js.Option.getExn(stateData.state); */
let getState = (stateData) =>
  switch stateData.state {
  | None => createState()
  | Some(state) => state
  };