let prepare = (state: StateDataType.state) => {
  TimeControllerTool.setStartTime(0.);
  state
};

let init = (state: StateDataType.state) => state |> DirectorSystem._noWorkerInit;

let run = (state: StateDataType.state, ~time=0., ()) => state |> DirectorSystem._run(time);

let runWithDefaultTime = (state: StateDataType.state) => state |> DirectorSystem._run(0.);