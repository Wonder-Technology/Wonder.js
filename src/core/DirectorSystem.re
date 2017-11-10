open StateSystem;

open StateData;

let _initSystem = (state: StateDataType.state) =>
  state |> TransformSystem.init |> CameraControllerSystem.init |> GeometrySystem.init;

let _init = (state: StateDataType.state) =>
  state
  |> _initSystem
  |> WebGLRenderSystem.init
  |> TimeControllerSystem.start
  |> ScheduleControllerSystem.start;

let _updateSystem = (elapsed: float, state: StateDataType.state) =>
  state |> TransformSystem.update |> CameraControllerSystem.update;

let _sync = (time: float, state: StateDataType.state) => {
  let elapsed = TimeControllerSystem.computeElapseTime(time, state);
  state
  |> TimeControllerSystem.tick(elapsed)
  |> ScheduleControllerSystem.update(elapsed)
  |> _updateSystem(elapsed)
};

let _run = (time: float, state: StateDataType.state) =>
  /* let elapsed = TimeControllerSystem.computeElapseTime(time, state); */
  state |> _sync(time) |> WebGLRenderSystem.render;

/* todo add time logic */
/* todo add scheduler */
/* todo unit test */
let loopBody = (time: float) => {
  let state = getState(stateData);
  state |> _run(time) |> setState(~stateData)
};

let start = (state: StateDataType.state) => {
  let rec _loop = (time: float) =>
    Dom.requestAnimationFrame(
      (time: float) => {
        /* state
           |> loopBody(time)
           |> setState(~stateData)
           |> _loop(time) */
        loopBody(time) |> ignore;
        /* state
           |> loopBody(time) */
        _loop(time)
      }
    );
  state |> _init |> setState(~stateData) |> ignore;
  _loop(0.)
};