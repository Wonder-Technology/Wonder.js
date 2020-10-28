'use strict';

var ListSt$Wonderjs = require("../../../../../../construct/domain_layer/library/structure/ListSt.bs.js");
var PipelineCPRepo$Wonderjs = require("../../../../repo/pipeline/PipelineCPRepo.bs.js");
var PipelineRunAPI$Wonderjs = require("../../../../../../construct/external_layer/api/domain/PipelineRunAPI.bs.js");
var StartTimeJobEntity$Wonderjs = require("../../../../../../construct/domain_layer/domain/pipeline/pipeline/entity/jobs/StartTimeJobEntity.bs.js");

function _getInitPipelineJobs(param) {
  return {
          hd: [
            StartTimeJobEntity$Wonderjs.create(undefined),
            StartTimeJobEntity$Wonderjs.exec
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
  return _register(PipelineCPRepo$Wonderjs.getInitPipeline(undefined), _getInitPipelineJobs(undefined));
}

exports._getInitPipelineJobs = _getInitPipelineJobs;
exports._register = _register;
exports.registerAllJobs = registerAllJobs;
/* PipelineCPRepo-Wonderjs Not a pure module */
