'use strict';

var DirectorAPI$Wonderjs = require("../../../src/api/DirectorAPI.js");
var TimeControllerTool$Wonderjs = require("../service/timeController/TimeControllerTool.js");

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

exports.prepare = prepare;
exports.init = init;
exports.run = run;
exports.runWithDefaultTime = runWithDefaultTime;
/* DirectorAPI-Wonderjs Not a pure module */
