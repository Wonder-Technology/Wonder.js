'use strict';

var JobTool$Wonderjs = require("../../../service/job/JobTool.js");
var InitStateJob$Wonderjs = require("../../../../../src/job/no_worker/init/InitStateJob.js");

function exec(state) {
  return InitStateJob$Wonderjs.execJob(JobTool$Wonderjs.getConfigRecord(/* () */0), state);
}

exports.exec = exec;
/* InitStateJob-Wonderjs Not a pure module */
