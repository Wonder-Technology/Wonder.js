let prepare = (state: StateDataType.state) => {
  TimeControllerTool.setStartTime(0.);
  state
};

let init = (state: StateDataType.state) => state |> DirectorSystem._noWorkerInit;

/* let initWithJob = (state: StateDataType.state) => state |> JobTool.init |> DirectorSystem.init;

   let initLogic = (state: StateDataType.state) => state |> JobTool.initLogic |> DirectorSystem.init; */
let initSystem = (state: StateDataType.state) =>
  state |> CameraControllerSystem.init |> GeometrySystem.init;

/* let sync = (state: StateDataType.state, ~time=0., ()) => DirectorSystem._sync(time, state); */
/* let run = (state: StateDataType.state, ~time=0., ()) => DirectorSystem._run(time, state);

   let loopBody = (~time: float=0., ()) => DirectorSystem.loopBody(time); */
let updateSystem = (~time: float=0., state: StateDataType.state) =>
  state |> CameraControllerSystem.update;