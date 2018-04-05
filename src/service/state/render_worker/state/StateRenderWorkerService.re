open RenderWorkerStateDataType;

let setState = (stateData, state) => {
  stateData.state = Some(state);
  state
};

/* let getState = (stateData) => OptionService.unsafeGet(stateData.state); */
let getState = (stateData) =>
  switch stateData.state {
  | None => CreateStateRenderWorkerService.createState()
  | Some(state) => state
  };