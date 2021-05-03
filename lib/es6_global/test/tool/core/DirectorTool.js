

import * as GPUDetectTool$Wonderjs from "../service/gpu/GPUDetectTool.js";
import * as TimeControllerTool$Wonderjs from "../service/timeController/TimeControllerTool.js";
import * as DirectorMainService$Wonderjs from "../../../src/service/state/main/director/DirectorMainService.js";

function prepare(state) {
  TimeControllerTool$Wonderjs.setStartTime(0);
  return GPUDetectTool$Wonderjs.setMaxTextureUnit(16, state);
}

var init = DirectorMainService$Wonderjs._noWorkerInit;

function run(state, $staropt$star, param) {
  var time = $staropt$star !== undefined ? $staropt$star : 0;
  return DirectorMainService$Wonderjs._run(time, state);
}

function runWithDefaultTime(state) {
  return DirectorMainService$Wonderjs._run(0, state);
}

export {
  prepare ,
  init ,
  run ,
  runWithDefaultTime ,
  
}
/* DirectorMainService-Wonderjs Not a pure module */
