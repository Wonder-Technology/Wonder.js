open StateDataMainType;

let initDirector = DirectorMainService.init;

let loopBody = (time: float, state: StateDataMainType.state) =>
  DirectorMainService.loopBody(time, state);

let startDirector = (state: StateDataMainType.state) =>
  DirectorMainService.start(state);