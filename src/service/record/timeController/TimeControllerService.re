open Root;

open TimeControllerType;

let starting_fps = 60.;

let gametime_scale = 1000.;

let getGameTime = ({gameTime}) => gameTime;

let getFps = ({fps}) => fps;

let getElapsed = ({elapsed}) => elapsed;

let _computeFps = (deltaTime: float, lastTime: option(float)) =>
  switch lastTime {
  | None => starting_fps
  | _ => gametime_scale /. deltaTime
  };

let tick = (elapsed: float, {lastTime} as record) => {
  let deltaTime =
    switch lastTime {
    | None => elapsed
    | Some(lastTime) => elapsed -. lastTime
    };
  {
    ...record,
    deltaTime,
    fps: _computeFps(deltaTime, lastTime),
    gameTime: elapsed /. gametime_scale,
    lastTime: Some(elapsed)
  }
};

let _getNow = () => {
  let now = root##performance##now;
  [@bs] now()
};

let start = (record) => {...record, startTime: _getNow(), elapsed: 0.};

/* TODO support pause */
let computeElapseTime = (time: float, {startTime} as record) =>
  {...record, elapsed: NumberService.leastFloat(0., time -. startTime)}
  |> WonderLog.Contract.ensureCheck(
       ({elapsed}) =>
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
       IsDebugMainService.getIsDebug(MainStateData.stateData)
     );