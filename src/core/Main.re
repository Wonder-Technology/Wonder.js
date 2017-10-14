open MainSystem;
open StateSystem;
open StateData;

let setMainConfig (configState:Js.t {..}) => {
getState stateData |> setConfig ::configState |> init;
 /* setConfig ::configState @@ getState (stateData); */
 /* getState(stateData) |> setConfig :configState; */
  /* setConfig ::configState ::state; */
}