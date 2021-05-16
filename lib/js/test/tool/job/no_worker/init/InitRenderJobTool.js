'use strict';

var DirectorTool$Wonderjs = require("../../../core/DirectorTool.js");
var PregetGLSLDataTool$Wonderjs = require("../loop/PregetGLSLDataTool.js");
var NoWorkerJobConfigTool$Wonderjs = require("../../../service/noWorkerJob/NoWorkerJobConfigTool.js");

function exec(state) {
  return DirectorTool$Wonderjs.init(DirectorTool$Wonderjs.prepare(PregetGLSLDataTool$Wonderjs.preparePrecision(state)));
}

function buildNoWorkerJobConfig(param) {
  return NoWorkerJobConfigTool$Wonderjs.buildNoWorkerJobConfig(undefined, NoWorkerJobConfigTool$Wonderjs.buildNoWorkerInitPipelineConfigWithoutInitMain(/* () */0), undefined, NoWorkerJobConfigTool$Wonderjs.buildNoWorkerInitJobConfigWithoutInitMain(/* () */0), undefined, /* () */0);
}

exports.exec = exec;
exports.buildNoWorkerJobConfig = buildNoWorkerJobConfig;
/* DirectorTool-Wonderjs Not a pure module */
