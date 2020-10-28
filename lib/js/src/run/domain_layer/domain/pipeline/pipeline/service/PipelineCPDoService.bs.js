'use strict';

var PipelineCPRepo$Wonderjs = require("../../../../repo/pipeline/PipelineCPRepo.bs.js");

function getInitPipeline(param) {
  return PipelineCPRepo$Wonderjs.getInitPipeline(undefined);
}

function getInitPipelineData(param) {
  return PipelineCPRepo$Wonderjs.getInitPipelineData(undefined);
}

var setInitPipelineData = PipelineCPRepo$Wonderjs.setInitPipelineData;

var getPipelineStream = PipelineCPRepo$Wonderjs.getPipelineStream;

exports.getInitPipeline = getInitPipeline;
exports.getInitPipelineData = getInitPipelineData;
exports.setInitPipelineData = setInitPipelineData;
exports.getPipelineStream = getPipelineStream;
/* PipelineCPRepo-Wonderjs Not a pure module */
