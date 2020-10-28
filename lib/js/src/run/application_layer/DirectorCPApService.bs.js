'use strict';

var TimeCPRepoDp$Wonderjs = require("../infrastructure_layer/dependency/repo/TimeCPRepoDp.bs.js");
var JobCPDoService$Wonderjs = require("../domain_layer/domain/pipeline/pipeline/service/JobCPDoService.bs.js");
var PipelineRunAPI$Wonderjs = require("../../construct/external_layer/api/domain/PipelineRunAPI.bs.js");
var PipelineCPRepoDp$Wonderjs = require("../infrastructure_layer/dependency/repo/PipelineCPRepoDp.bs.js");
var TimeRepoDpRunAPI$Wonderjs = require("../../construct/external_layer/api/dependency/TimeRepoDpRunAPI.bs.js");
var PictureCPDoService$Wonderjs = require("../domain_layer/domain/picture/picture/service/PictureCPDoService.bs.js");
var PipelineCPDoService$Wonderjs = require("../domain_layer/domain/pipeline/pipeline/service/PipelineCPDoService.bs.js");
var PipelineRepoDpRunAPI$Wonderjs = require("../../construct/external_layer/api/dependency/PipelineRepoDpRunAPI.bs.js");

function _injectDependencies(param) {
  PipelineRepoDpRunAPI$Wonderjs.set({
        getJobExecFunc: PipelineCPRepoDp$Wonderjs.getJobExecFunc,
        setJobExecFunc: PipelineCPRepoDp$Wonderjs.setJobExecFunc,
        getPipelineStream: PipelineCPRepoDp$Wonderjs.getPipelineStream,
        setPipelineStream: PipelineCPRepoDp$Wonderjs.setPipelineStream
      });
  return TimeRepoDpRunAPI$Wonderjs.set({
              getElapsed: TimeCPRepoDp$Wonderjs.getElapsed,
              start: TimeCPRepoDp$Wonderjs.start
            });
}

function prepare(pictureSize) {
  _injectDependencies(undefined);
  return PictureCPDoService$Wonderjs.setSize(pictureSize);
}

var _parseAndSetPipelineStream = PipelineRunAPI$Wonderjs.parsePipelineData;

function init(param) {
  JobCPDoService$Wonderjs.registerAllJobs(undefined);
  return PipelineRunAPI$Wonderjs.parsePipelineData(PipelineCPDoService$Wonderjs.getInitPipelineData(undefined));
}

exports._injectDependencies = _injectDependencies;
exports.prepare = prepare;
exports._parseAndSetPipelineStream = _parseAndSetPipelineStream;
exports.init = init;
/* TimeCPRepoDp-Wonderjs Not a pure module */
