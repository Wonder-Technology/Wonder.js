let prepare = (state: StateDataMainType.state) => {
  TimeControllerTool.setStartTime(0.);
  state
};

let init = (state: StateDataMainType.state) => state |> DirectorAPI._noWorkerInit;

let run = (state: StateDataMainType.state, ~time=0., ()) => state |> DirectorAPI._run(time);

let runWithDefaultTime = (state: StateDataMainType.state) => state |> DirectorAPI._run(0.);