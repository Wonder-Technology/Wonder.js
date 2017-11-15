open StateSystem;

open StateData;

let _initSystem = (state: StateDataType.state) =>
  state |> TransformSystem.init |> CameraControllerSystem.init |> GeometrySystem.init;

let init = (state: StateDataType.state) =>
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

/* todo unit test */
let loopBody = (time: float, state: StateDataType.state) =>
  state |> _run(time);

let start = (state: StateDataType.state) => {
  /* todo save loop id */
  let rec _loop = (time: float, state: StateDataType.state) : int =>
    Dom.requestAnimationFrame
      (
        (time: float) =>
          state |> loopBody(time) |> setState(stateData) |> _loop(time) |> ignore
      );
  state |> init |> _loop(0.) |> ignore
};