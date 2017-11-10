open Contract;

open Root;

open TimeControllerType;

let _getTimeControllerData = (state: StateDataType.state) => state.timeControllerData;

let starting_fps = 60.;

let gametime_scale = 1000.;

let getGameTime = (state: StateDataType.state) => _getTimeControllerData(state).gameTime;

let getFps = (state: StateDataType.state) => _getTimeControllerData(state).fps;

let _computeFps = (deltaTime: float, lastTime: option(float)) =>
  switch lastTime {
  | None => starting_fps
  | _ => gametime_scale /. deltaTime
  };

let tick = (elapsed: float, state: StateDataType.state) => {
  let {lastTime} as data = _getTimeControllerData(state);
  let deltaTime =
    switch lastTime {
    | None => elapsed
    | Some(lastTime) => elapsed -. lastTime
    };
  data.deltaTime = deltaTime;
  data.fps = _computeFps(deltaTime, lastTime);
  data.gameTime = elapsed /. gametime_scale;
  data.lastTime = Some(elapsed);
  state
};

let _getNow = () => {
  let now = root##performance##now;
  [@bs] now()
};

let start = (state: StateDataType.state) => {
  let data = _getTimeControllerData(state);
  data.startTime = _getNow();
  data.elapsed = 0.;
  state
};

/* todo support pause */
let computeElapseTime = (time: float, state: StateDataType.state) => {
  let {startTime} as data = _getTimeControllerData(state);
  data.elapsed = NumberUtils.leastFloat(0., time -. startTime);
  data.elapsed
  |> ensureCheck(
       (r) =>
         Contract.Operators.(test({j|elapsed should >= 0, but actual is $r|j}, () => r >=. 0.))
     )
};

let initData = () => {
  elapsed: 0.,
  startTime: 0.,
  deltaTime: 0.,
  lastTime: None,
  gameTime: 0.,
  fps: 0.
};