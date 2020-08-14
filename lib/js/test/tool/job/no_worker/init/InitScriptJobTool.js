'use strict';

var JobTool$Wonderjs = require("../../../service/job/JobTool.js");
var InitScriptJob$Wonderjs = require("../../../../../src/job/no_worker/init/InitScriptJob.js");

function exec(state) {
  return InitScriptJob$Wonderjs.execJob(JobTool$Wonderjs.getConfigRecord(/* () */0), state);
}

exports.exec = exec;
/* InitScriptJob-Wonderjs Not a pure module */
