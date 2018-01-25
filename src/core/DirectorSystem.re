open StateSystem;

open StateData;

let init = (state: StateDataType.state) =>
  state
  |> LogicJobSystem.execLogicInitJobs
  |> RenderJobSystem.execRenderInitJobs([@bs] DeviceManagerSystem.unsafeGetGl(state));

let _run = (time: float, state: StateDataType.state) => {
  let elapsed = TimeControllerSystem.computeElapseTime(time, state);
  state
  |> LogicJobSystem.execLogicUpdateJobs(elapsed)
  |> RenderJobSystem.execRenderRenderJobs([@bs] DeviceManagerSystem.unsafeGetGl(state))
};

/* TODO unit test */
let loopBody = (time: float, state: StateDataType.state) => state |> _run(time);

let start = (state: StateDataType.state) => {
  /* TODO save loop id */
  let rec _loop = (time: float, state: StateDataType.state) : int =>
    Dom.requestAnimationFrame(
      (time: float) => state |> loopBody(time) |> setState(stateData) |> _loop(time) |> ignore
    );
  state |> init |> _loop(0.) |> ignore
};