let init = (state: StateDataType.state) => DirectorSystem._init(state);

let loopBody = (~time: float=0., state: StateDataType.state) =>
  DirectorSystem._run(~elapsed=time, state);
