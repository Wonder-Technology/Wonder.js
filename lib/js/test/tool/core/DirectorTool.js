'use strict';

var GPUDetectTool$Wonderjs = require("../service/gpu/GPUDetectTool.js");
var TimeControllerTool$Wonderjs = require("../service/timeController/TimeControllerTool.js");
var DirectorMainService$Wonderjs = require("../../../src/service/state/main/director/DirectorMainService.js");

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

exports.prepare = prepare;
exports.init = init;
exports.run = run;
exports.runWithDefaultTime = runWithDefaultTime;
/* DirectorMainService-Wonderjs Not a pure module */
