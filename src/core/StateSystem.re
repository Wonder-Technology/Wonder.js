open StateData;

let getState (stateData: stateData) :state => Js.Option.getExn stateData.state;

let setState (stateData: stateData) (state: state) => stateData.state = Some state;