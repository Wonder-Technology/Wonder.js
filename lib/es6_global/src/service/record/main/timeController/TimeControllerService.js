

import * as Log$WonderLog from "./../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "./../../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as NumberService$Wonderjs from "../../../primitive/NumberService.js";
import * as StateDataMain$Wonderjs from "../../../state/main/data/StateDataMain.js";
import * as IsDebugMainService$Wonderjs from "../../../state/main/state/IsDebugMainService.js";

function getGameTime(param) {
  return param[/* gameTime */4];
}

function getFps(param) {
  return param[/* fps */5];
}

function getElapsed(param) {
  return param[/* elapsed */0];
}

function _computeFps(deltaTime, lastTime) {
  if (lastTime !== undefined) {
    return 1000 / deltaTime;
  } else {
    return 60;
  }
}

function tick(elapsed, record) {
  var lastTime = record[/* lastTime */3];
  var deltaTime = lastTime !== undefined ? elapsed - lastTime : elapsed;
  return /* record */[
          /* elapsed */record[/* elapsed */0],
          /* startTime */record[/* startTime */1],
          /* deltaTime */deltaTime,
          /* lastTime */elapsed,
          /* gameTime */elapsed / 1000,
          /* fps */_computeFps(deltaTime, lastTime)
        ];
}

function _getNow(param) {
  return window.performance.now();
}

function start(record) {
  return /* record */[
          /* elapsed */0,
          /* startTime */window.performance.now(),
          /* deltaTime */record[/* deltaTime */2],
          /* lastTime */record[/* lastTime */3],
          /* gameTime */record[/* gameTime */4],
          /* fps */record[/* fps */5]
        ];
}

function computeElapseTime(time, record) {
  return Contract$WonderLog.ensureCheck((function (param) {
                var elapsed = param[/* elapsed */0];
                return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("elapsed >= 0", "is " + (String(elapsed) + "")), (function (param) {
                              return Contract$WonderLog.Operators[/* >=. */8](elapsed, 0);
                            }));
              }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData), /* record */[
              /* elapsed */NumberService$Wonderjs.leastFloat(0, time - record[/* startTime */1]),
              /* startTime */record[/* startTime */1],
              /* deltaTime */record[/* deltaTime */2],
              /* lastTime */record[/* lastTime */3],
              /* gameTime */record[/* gameTime */4],
              /* fps */record[/* fps */5]
            ]);
}

var starting_fps = 60;

var gametime_scale = 1000;

export {
  starting_fps ,
  gametime_scale ,
  getGameTime ,
  getFps ,
  getElapsed ,
  _computeFps ,
  tick ,
  _getNow ,
  start ,
  computeElapseTime ,
  
}
/* Log-WonderLog Not a pure module */
