'use strict';

var PipelineCPRepo$Wonderjs = require("../../../../repo/PipelineCPRepo.bs.js");

function getInitPipeline(param) {
  return PipelineCPRepo$Wonderjs.getInitPipeline(undefined);
}

function getRunPipeline(param) {
  return PipelineCPRepo$Wonderjs.getRunPipeline(undefined);
}

function getInitPipelineData(param) {
  return PipelineCPRepo$Wonderjs.getInitPipelineData(undefined);
}

var setInitPipelineData = PipelineCPRepo$Wonderjs.setInitPipelineData;

function getRunPipelineData(param) {
  return PipelineCPRepo$Wonderjs.getRunPipelineData(undefined);
}

var setRunPipelineData = PipelineCPRepo$Wonderjs.setRunPipelineData;

var getPipelineStream = PipelineCPRepo$Wonderjs.getPipelineStream;

exports.getInitPipeline = getInitPipeline;
exports.getRunPipeline = getRunPipeline;
exports.getInitPipelineData = getInitPipelineData;
exports.setInitPipelineData = setInitPipelineData;
exports.getRunPipelineData = getRunPipelineData;
exports.setRunPipelineData = setRunPipelineData;
exports.getPipelineStream = getPipelineStream;
/* PipelineCPRepo-Wonderjs Not a pure module */
