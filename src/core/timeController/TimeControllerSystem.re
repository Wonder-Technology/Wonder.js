open Root;

open TimeControllerType;

let _getTimeControllerData = (state: MainStateDataType.state) => state.timeControllerData;

let starting_fps = 60.;

let gametime_scale = 1000.;

let getGameTime = (state: MainStateDataType.state) => _getTimeControllerData(state).gameTime;

let getFps = (state: MainStateDataType.state) => _getTimeControllerData(state).fps;

let _computeFps = (deltaTime: float, lastTime: option(float)) =>
  switch lastTime {
  | None => starting_fps
  | _ => gametime_scale /. deltaTime
  };

let tick = (elapsed: float, state: MainStateDataType.state) => {
  let {lastTime} as record = _getTimeControllerData(state);
  let deltaTime =
    switch lastTime {
    | None => elapsed
    | Some(lastTime) => elapsed -. lastTime
    };
  record.deltaTime = deltaTime;
  record.fps = _computeFps(deltaTime, lastTime);
  record.gameTime = elapsed /. gametime_scale;
  record.lastTime = Some(elapsed);
  state
};

let _getNow = () => {
  let now = root##performance##now;
  [@bs] now()
};

let start = (state: MainStateDataType.state) => {
  let record = _getTimeControllerData(state);
  record.startTime = _getNow();
  record.elapsed = 0.;
  state
};

/* TODO support pause */
let computeElapseTime = (time: float, state: MainStateDataType.state) => {
  let {startTime} as record = _getTimeControllerData(state);
  record.elapsed = NumberUtils.leastFloat(0., time -. startTime);
  record.elapsed
  |> WonderLog.Contract.ensureCheck(
       (elapsed) =>
         WonderLog.(
           Contract.(
             Operators.(
               test(
                 Log.buildAssertMessage(~expect={j|elapsed >= 0|j}, ~actual={j|is $elapsed|j}),
                 () => elapsed >=. 0.
               )
             )
           )
         ),
       MainStateData.stateData.isDebug
     )
};