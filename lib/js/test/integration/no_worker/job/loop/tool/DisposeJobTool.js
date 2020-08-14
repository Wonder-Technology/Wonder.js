'use strict';

var DisposeJob$Wonderjs = require("../../../../../../src/job/no_worker/loop/DisposeJob.js");
var ReallocateMemoryTool$Wonderjs = require("../../../../../tool/reallocate/ReallocateMemoryTool.js");

function disposeAndReallocate(state) {
  return ReallocateMemoryTool$Wonderjs.reallocateAll(DisposeJob$Wonderjs.execJob(undefined, state));
}

exports.disposeAndReallocate = disposeAndReallocate;
/* DisposeJob-Wonderjs Not a pure module */
