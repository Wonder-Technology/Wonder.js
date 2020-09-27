'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var JobEntity$Wonderjs = require("../entity/JobEntity.bs.js");
var DpContainer$Wonderjs = require("../../../../dependency/container/DpContainer.bs.js");
var PipelineEntity$Wonderjs = require("../entity/PipelineEntity.bs.js");

function register(pipeline, job, execFunc) {
  return Curry._3(DpContainer$Wonderjs.unsafeGetPipelineRepoDp(undefined).setJobExecFunc, PipelineEntity$Wonderjs.value(pipeline), JobEntity$Wonderjs.value(job), execFunc);
}

function getExecFunc(pipelineName, jobName) {
  return Curry._2(DpContainer$Wonderjs.unsafeGetPipelineRepoDp(undefined).getJobExecFunc, pipelineName, jobName);
}

exports.register = register;
exports.getExecFunc = getExecFunc;
/* No side effect */
