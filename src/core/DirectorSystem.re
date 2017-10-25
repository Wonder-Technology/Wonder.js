open StateSystem;

open StateData;

let _initSystem (state: StateDataType.state) => state |> TransformSystem.init;

let _init (state: StateDataType.state) => state |> _initSystem;

let _updateSystem (elapsed: float) (state: StateDataType.state) => state |> TransformSystem.update;

let _sync (elapsed: float) (state: StateDataType.state) => _updateSystem elapsed state;

let _run elapsed::(elapsed: float) (state: StateDataType.state) => _sync elapsed state;

/* todo add time logic */
/* todo add scheduler */
let _loopBody (time: float) =>
  getState stateData |> _run elapsed::time |> setState ::stateData |> ignore;

let start (state: StateDataType.state) =>
  state |> _init |> (fun _ => Dom.requestAnimationFrame _loopBody);