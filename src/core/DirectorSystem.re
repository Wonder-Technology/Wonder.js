open StateSystem;

let init = (stateData, state: StateDataType.state) =>
  /* state
     |> LogicJobSystem.execLogicInitJobs
     |> RenderJobSystem.execRenderInitJobs([@bs] DeviceManagerSystem.unsafeGetGl(state)); */
  /* TODO handle single */
  WorkerJobSystem.getMainInitJobStream(stateData, state);

/*
 let _run = (time: float, state: StateDataType.state) => {
   let elapsed = TimeControllerSystem.computeElapseTime(time, state);
   state
   |> LogicJobSystem.execLogicUpdateJobs(elapsed)
   |> RenderJobSystem.execRenderRenderJobs([@bs] DeviceManagerSystem.unsafeGetGl(state))
 }; */
/* TODO unit test */
/* let loopBody = (time: float, state: StateDataType.state) => state |> _run(time); */
let start = (state: StateDataType.state) =>
  /*
    TODO save loop id
    let rec _loop = (time: float, state: StateDataType.state) : int =>
      Dom.requestAnimationFrame(
        (time: float) => state |> loopBody(time) |> setState(stateData) |> _loop(time) |> ignore
      );
    state |> init(StateData.stateData) |> _loop(0.) |> ignore

   */
  /* state |> init(StateData.stateData) |> ignore; */
  state
  |> StateSystem.setState(StateData.stateData)
  |> init(StateData.stateData)
  |> Most.drain
  |> ignore;