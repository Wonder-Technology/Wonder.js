open MainSystem;

open StateSystem;

let setMainConfig (configState: Js.t {..}) =>
  createState () |> setConfig ::configState |> init;