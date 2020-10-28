'use strict';

var CPRepo$Wonderjs = require("../../../infrastructure_layer/data/container/CPRepo.bs.js");
var PipelineEntity$Wonderjs = require("../../../../construct/domain_layer/domain/pipeline/pipeline/entity/PipelineEntity.bs.js");
var PipelineCPRepoDp$Wonderjs = require("../../../infrastructure_layer/dependency/repo/PipelineCPRepoDp.bs.js");

function getInitPipeline(param) {
  return PipelineEntity$Wonderjs.create(CPRepo$Wonderjs.getPipeline(undefined).initPipeline);
}

function getInitPipelineData(param) {
  return CPRepo$Wonderjs.getPipeline(undefined).initPipelineData;
}

function setInitPipelineData(initPipelineData) {
  var init = CPRepo$Wonderjs.getPipeline(undefined);
  return CPRepo$Wonderjs.setPipeline({
              initPipeline: init.initPipeline,
              initPipelineData: initPipelineData,
              pipelineStreamMap: init.pipelineStreamMap,
              jobExecFuncMap: init.jobExecFuncMap
            });
}

function getPipelineStream(pipeline) {
  return PipelineCPRepoDp$Wonderjs.getPipelineStream(PipelineEntity$Wonderjs.value(pipeline));
}

function setPipelineStream(pipeline, stream) {
  return PipelineCPRepoDp$Wonderjs.setPipelineStream(PipelineEntity$Wonderjs.value(pipeline), stream);
}

exports.getInitPipeline = getInitPipeline;
exports.getInitPipelineData = getInitPipelineData;
exports.setInitPipelineData = setInitPipelineData;
exports.getPipelineStream = getPipelineStream;
exports.setPipelineStream = setPipelineStream;
/* CPRepo-Wonderjs Not a pure module */
