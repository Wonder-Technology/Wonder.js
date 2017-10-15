open MainSystem;

open StateSystem;

open StateData;

let setMainConfig (configState: Js.t {..}) =>
  getState stateData |> setConfig ::configState |> init;