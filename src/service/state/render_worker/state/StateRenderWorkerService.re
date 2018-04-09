open StateDataRenderWorkerType;

let setState = (stateData, state) => {
  stateData.state = Some(state);
  state
};

let unsafeGetState = (stateData) =>
stateData.state |> OptionService.unsafeGet;
  /* switch stateData.state {
  | None => CreateStateRenderWorkerService.createState()
  | Some(state) => state
  }; */