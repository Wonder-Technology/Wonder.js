'use strict';

var ListSt$Wonderjs = require("../../../../../../../construct/domain_layer/library/structure/ListSt.bs.js");
var PipelineCPRepo$Wonderjs = require("../../../../repo/PipelineCPRepo.bs.js");
var PipelineRunAPI$Wonderjs = require("../../../../../../../construct/external_layer/api/run/PipelineRunAPI.bs.js");
var StartTimeCPJobEntity$Wonderjs = require("../entity/jobs/init/StartTimeCPJobEntity.bs.js");
var UpdateTransformCPJobEntity$Wonderjs = require("../entity/jobs/run/UpdateTransformCPJobEntity.bs.js");

function _getInitPipelineJobs(param) {
  return {
          hd: [
            StartTimeCPJobEntity$Wonderjs.create(undefined),
            StartTimeCPJobEntity$Wonderjs.exec
          ],
          tl: /* [] */0
        };
}

function _getRunPipelineJobs(param) {
  return {
          hd: [
            UpdateTransformCPJobEntity$Wonderjs.create(undefined),
            UpdateTransformCPJobEntity$Wonderjs.exec
          ],
          tl: /* [] */0
        };
}

function _register(pipeline, jobs) {
  return ListSt$Wonderjs.forEach(jobs, (function (param) {
                return PipelineRunAPI$Wonderjs.registerJob(pipeline, param[0], param[1]);
              }));
}

function registerAllJobs(param) {
  _register(PipelineCPRepo$Wonderjs.getInitPipeline(undefined), _getInitPipelineJobs(undefined));
  return _register(PipelineCPRepo$Wonderjs.getRunPipeline(undefined), _getRunPipelineJobs(undefined));
}

exports._getInitPipelineJobs = _getInitPipelineJobs;
exports._getRunPipelineJobs = _getRunPipelineJobs;
exports._register = _register;
exports.registerAllJobs = registerAllJobs;
/* PipelineCPRepo-Wonderjs Not a pure module */
