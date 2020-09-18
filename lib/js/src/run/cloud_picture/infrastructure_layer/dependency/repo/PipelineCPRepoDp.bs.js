'use strict';

var Caml_option = require("bs-platform/lib/js/caml_option.js");
var CPRepo$Wonderjs = require("../../data/container/CPRepo.bs.js");
var ImmutableHashMap$Wonderjs = require("../../../../../construct/domain_layer/library/structure/hash_map/ImmutableHashMap.bs.js");

function getJobExecFunc(pipelineName, jobName) {
  var map = ImmutableHashMap$Wonderjs.get(CPRepo$Wonderjs.getPipeline(undefined).jobExecFuncMap, pipelineName);
  if (map !== undefined) {
    return ImmutableHashMap$Wonderjs.getNullable(Caml_option.valFromOption(map), jobName);
  } else {
    return null;
  }
}

function setJobExecFunc(pipelineName, jobName, execFunc) {
  var map = ImmutableHashMap$Wonderjs.get(CPRepo$Wonderjs.getPipeline(undefined).jobExecFuncMap, pipelineName);
  var map$1 = map !== undefined ? Caml_option.valFromOption(map) : ImmutableHashMap$Wonderjs.createEmpty(undefined, undefined);
  var init = CPRepo$Wonderjs.getPipeline(undefined);
  return CPRepo$Wonderjs.setPipeline({
              initPipeline: init.initPipeline,
              updatePipeline: init.updatePipeline,
              renderPipeline: init.renderPipeline,
              initPipelineData: init.initPipelineData,
              updatePipelineData: init.updatePipelineData,
              renderPipelineData: init.renderPipelineData,
              pipelineStreamMap: init.pipelineStreamMap,
              jobExecFuncMap: ImmutableHashMap$Wonderjs.set(CPRepo$Wonderjs.getPipeline(undefined).jobExecFuncMap, pipelineName, ImmutableHashMap$Wonderjs.set(map$1, jobName, execFunc))
            });
}

function getPipelineStream(pipeline) {
  return ImmutableHashMap$Wonderjs.getNullable(CPRepo$Wonderjs.getPipeline(undefined).pipelineStreamMap, pipeline);
}

function setPipelineStream(pipeline, stream) {
  var pipelinePO = CPRepo$Wonderjs.getPipeline(undefined);
  return CPRepo$Wonderjs.setPipeline({
              initPipeline: pipelinePO.initPipeline,
              updatePipeline: pipelinePO.updatePipeline,
              renderPipeline: pipelinePO.renderPipeline,
              initPipelineData: pipelinePO.initPipelineData,
              updatePipelineData: pipelinePO.updatePipelineData,
              renderPipelineData: pipelinePO.renderPipelineData,
              pipelineStreamMap: ImmutableHashMap$Wonderjs.set(pipelinePO.pipelineStreamMap, pipeline, stream),
              jobExecFuncMap: pipelinePO.jobExecFuncMap
            });
}

exports.getJobExecFunc = getJobExecFunc;
exports.setJobExecFunc = setJobExecFunc;
exports.getPipelineStream = getPipelineStream;
exports.setPipelineStream = setPipelineStream;
/* CPRepo-Wonderjs Not a pure module */
