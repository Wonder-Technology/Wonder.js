let prepare = (state: StateDataMainType.state) => {
  TimeControllerTool.setStartTime(0.);
  state
};

let init = (state: StateDataMainType.state) => state |> DirectorSystem._noWorkerInit;

let run = (state: StateDataMainType.state, ~time=0., ()) => state |> DirectorSystem._run(time);

let runWithDefaultTime = (state: StateDataMainType.state) => state |> DirectorSystem._run(0.);