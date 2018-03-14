open MainStateDataType;

let getState = (stateData) =>
  switch stateData.state {
  | None => CreateStateMainService.createState()
  | Some(state) => state
  };

let setState = (stateData, state) => {
  stateData.state = Some(state);
  state
};