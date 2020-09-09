'use strict';

var PipelineCPRepo$Wonderjs = require("../../../../repo/pipeline/PipelineCPRepo.bs.js");

function getInitPipeline(param) {
  return PipelineCPRepo$Wonderjs.getInitPipeline(undefined);
}

function getUpdatePipeline(param) {
  return PipelineCPRepo$Wonderjs.getUpdatePipeline(undefined);
}

function getRenderPipeline(param) {
  return PipelineCPRepo$Wonderjs.getRenderPipeline(undefined);
}

function getInitPipelineData(param) {
  return PipelineCPRepo$Wonderjs.getInitPipelineData(undefined);
}

var setInitPipelineData = PipelineCPRepo$Wonderjs.setInitPipelineData;

function getUpdatePipelineData(param) {
  return PipelineCPRepo$Wonderjs.getUpdatePipelineData(undefined);
}

var setUpdatePipelineData = PipelineCPRepo$Wonderjs.setUpdatePipelineData;

function getRenderPipelineData(param) {
  return PipelineCPRepo$Wonderjs.getRenderPipelineData(undefined);
}

var setRenderPipelineData = PipelineCPRepo$Wonderjs.setRenderPipelineData;

var getPipelineStream = PipelineCPRepo$Wonderjs.getPipelineStream;

exports.getInitPipeline = getInitPipeline;
exports.getUpdatePipeline = getUpdatePipeline;
exports.getRenderPipeline = getRenderPipeline;
exports.getInitPipelineData = getInitPipelineData;
exports.setInitPipelineData = setInitPipelineData;
exports.getUpdatePipelineData = getUpdatePipelineData;
exports.setUpdatePipelineData = setUpdatePipelineData;
exports.getRenderPipelineData = getRenderPipelineData;
exports.setRenderPipelineData = setRenderPipelineData;
exports.getPipelineStream = getPipelineStream;
/* PipelineCPRepo-Wonderjs Not a pure module */
