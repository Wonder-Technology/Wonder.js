let prepare = (state: StateDataType.state) => {
  TimeControllerTool.setStartTime(0.);
  state
};

let init = (state: StateDataType.state) => DirectorSystem.init(state);

let initSystem = (state: StateDataType.state) => GameObjectAdmin.init(state);

let sync = (state: StateDataType.state, ~time=0., ()) => DirectorSystem._sync(time, state);

let run = (state: StateDataType.state, ~time=0., ()) => DirectorSystem._run(time, state);

let loopBody = (~time: float=0., ()) => DirectorSystem.loopBody(time);

let updateSystem = (~time: float=0., state: StateDataType.state) =>
  GameObjectAdmin.update(time, state);