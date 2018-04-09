open StateDataMainType;

/* let unsafeGetState = (stateData) =>
   switch stateData.state {
   | None => CreateStateMainService.createState()
   | Some(state) => state
   }; */
let unsafeGetState = (stateData) => stateData.state |> OptionService.unsafeGet;

let setState = (stateData, state) => {
  stateData.state = Some(state);
  state
};