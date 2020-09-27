'use strict';

var CPRepo$Wonderjs = require("../../../infrastructure_layer/data/container/CPRepo.bs.js");
var PipelineEntity$Wonderjs = require("../../../../../construct/domain_layer/domain/pipeline/pipeline/entity/PipelineEntity.bs.js");
var PipelineCPRepoDp$Wonderjs = require("../../../infrastructure_layer/dependency/repo/PipelineCPRepoDp.bs.js");

function getInitPipeline(param) {
  return PipelineEntity$Wonderjs.create(CPRepo$Wonderjs.getPipeline(undefined).initPipeline);
}

function getUpdatePipeline(param) {
  return PipelineEntity$Wonderjs.create(CPRepo$Wonderjs.getPipeline(undefined).updatePipeline);
}

function getRenderPipeline(param) {
  return PipelineEntity$Wonderjs.create(CPRepo$Wonderjs.getPipeline(undefined).renderPipeline);
}

function getInitPipelineData(param) {
  return CPRepo$Wonderjs.getPipeline(undefined).initPipelineData;
}

function setInitPipelineData(initPipelineData) {
  var init = CPRepo$Wonderjs.getPipeline(undefined);
  return CPRepo$Wonderjs.setPipeline({
              initPipeline: init.initPipeline,
              updatePipeline: init.updatePipeline,
              renderPipeline: init.renderPipeline,
              initPipelineData: initPipelineData,
              updatePipelineData: init.updatePipelineData,
              renderPipelineData: init.renderPipelineData,
              pipelineStreamMap: init.pipelineStreamMap,
              jobExecFuncMap: init.jobExecFuncMap
            });
}

function getUpdatePipelineData(param) {
  return CPRepo$Wonderjs.getPipeline(undefined).updatePipelineData;
}

function setUpdatePipelineData(updatePipelineData) {
  var init = CPRepo$Wonderjs.getPipeline(undefined);
  return CPRepo$Wonderjs.setPipeline({
              initPipeline: init.initPipeline,
              updatePipeline: init.updatePipeline,
              renderPipeline: init.renderPipeline,
              initPipelineData: init.initPipelineData,
              updatePipelineData: updatePipelineData,
              renderPipelineData: init.renderPipelineData,
              pipelineStreamMap: init.pipelineStreamMap,
              jobExecFuncMap: init.jobExecFuncMap
            });
}

function getRenderPipelineData(param) {
  return CPRepo$Wonderjs.getPipeline(undefined).renderPipelineData;
}

function setRenderPipelineData(renderPipelineData) {
  var init = CPRepo$Wonderjs.getPipeline(undefined);
  return CPRepo$Wonderjs.setPipeline({
              initPipeline: init.initPipeline,
              updatePipeline: init.updatePipeline,
              renderPipeline: init.renderPipeline,
              initPipelineData: init.initPipelineData,
              updatePipelineData: init.updatePipelineData,
              renderPipelineData: renderPipelineData,
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
exports.getUpdatePipeline = getUpdatePipeline;
exports.getRenderPipeline = getRenderPipeline;
exports.getInitPipelineData = getInitPipelineData;
exports.setInitPipelineData = setInitPipelineData;
exports.getUpdatePipelineData = getUpdatePipelineData;
exports.setUpdatePipelineData = setUpdatePipelineData;
exports.getRenderPipelineData = getRenderPipelineData;
exports.setRenderPipelineData = setRenderPipelineData;
exports.getPipelineStream = getPipelineStream;
exports.setPipelineStream = setPipelineStream;
/* CPRepo-Wonderjs Not a pure module */
