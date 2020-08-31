'use strict';

var CPRepo$Wonderjs = require("./CPRepo.bs.js");
var OptionSt$Wonderjs = require("../../../../construct/domain_layer/library/structure/OptionSt.bs.js");
var PipelineEntity$Wonderjs = require("../../../../construct/domain_layer/domain/pipeline/pipeline/entity/PipelineEntity.bs.js");
var PipelineCPRepoDp$Wonderjs = require("../../infrastructure_layer/dependency/repo/PipelineCPRepoDp.bs.js");

function getInitPipeline(param) {
  return PipelineEntity$Wonderjs.create(CPRepo$Wonderjs.getPipeline(undefined).initPipeline);
}

function getRunPipeline(param) {
  return PipelineEntity$Wonderjs.create(CPRepo$Wonderjs.getPipeline(undefined).runPipeline);
}

function getInitPipelineData(param) {
  return CPRepo$Wonderjs.getPipeline(undefined).initPipelineData;
}

function setInitPipelineData(initPipelineData) {
  var init = CPRepo$Wonderjs.getPipeline(undefined);
  return CPRepo$Wonderjs.setPipeline({
              initPipeline: init.initPipeline,
              runPipeline: init.runPipeline,
              initPipelineData: initPipelineData,
              runPipelineData: init.runPipelineData,
              pipelineStreamMap: init.pipelineStreamMap,
              jobExecFuncMap: init.jobExecFuncMap
            });
}

function getRunPipelineData(param) {
  return CPRepo$Wonderjs.getPipeline(undefined).runPipelineData;
}

function setRunPipelineData(runPipelineData) {
  var init = CPRepo$Wonderjs.getPipeline(undefined);
  return CPRepo$Wonderjs.setPipeline({
              initPipeline: init.initPipeline,
              runPipeline: init.runPipeline,
              initPipelineData: init.initPipelineData,
              runPipelineData: runPipelineData,
              pipelineStreamMap: init.pipelineStreamMap,
              jobExecFuncMap: init.jobExecFuncMap
            });
}

function getPipelineStream(pipeline) {
  return OptionSt$Wonderjs.fromNullable(PipelineCPRepoDp$Wonderjs.getPipelineStream(PipelineEntity$Wonderjs.value(pipeline)));
}

function setPipelineStream(pipeline, stream) {
  return PipelineCPRepoDp$Wonderjs.setPipelineStream(PipelineEntity$Wonderjs.value(pipeline), stream);
}

exports.getInitPipeline = getInitPipeline;
exports.getRunPipeline = getRunPipeline;
exports.getInitPipelineData = getInitPipelineData;
exports.setInitPipelineData = setInitPipelineData;
exports.getRunPipelineData = getRunPipelineData;
exports.setRunPipelineData = setRunPipelineData;
exports.getPipelineStream = getPipelineStream;
exports.setPipelineStream = setPipelineStream;
/* CPRepo-Wonderjs Not a pure module */
