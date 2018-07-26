

import * as DirectorAPI$Wonderjs from "../../../src/api/DirectorAPI.js";
import * as TimeControllerTool$Wonderjs from "../service/timeController/TimeControllerTool.js";

function prepare(state) {
  TimeControllerTool$Wonderjs.setStartTime(0);
  return state;
}

var init = DirectorAPI$Wonderjs._noWorkerInit;

function run(state, $staropt$star, _) {
  var time = $staropt$star !== undefined ? $staropt$star : 0;
  return DirectorAPI$Wonderjs._run(time, state);
}

function runWithDefaultTime(state) {
  return DirectorAPI$Wonderjs._run(0, state);
}

export {
  prepare ,
  init ,
  run ,
  runWithDefaultTime ,
  
}
/* DirectorAPI-Wonderjs Not a pure module */
