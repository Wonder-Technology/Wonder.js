

import * as Log$WonderLog from "./../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "./../../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as OptionService$Wonderjs from "../../../atom/OptionService.js";
import * as StateDataMain$Wonderjs from "../../../state/main/data/StateDataMain.js";
import * as JobConfigService$Wonderjs from "../../../primitive/JobConfigService.js";
import * as IsDebugMainService$Wonderjs from "../../../state/main/state/IsDebugMainService.js";

function _unsafeGetNoWorkerJobConfig(record) {
  Contract$WonderLog.requireCheck((function (param) {
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("noWorker job config exist", "not"), (function (param) {
                        return Contract$WonderLog.assertExist(record);
                      }));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return OptionService$Wonderjs.unsafeGet(record);
}

function getInitPipelines(record) {
  return _unsafeGetNoWorkerJobConfig(record)[/* initPipelines */1];
}

function getInitJobs(record) {
  return _unsafeGetNoWorkerJobConfig(record)[/* initJobs */3];
}

function getLoopPipelines(record) {
  return _unsafeGetNoWorkerJobConfig(record)[/* loopPipelines */2];
}

function getLoopJobs(record) {
  return _unsafeGetNoWorkerJobConfig(record)[/* loopJobs */4];
}

function getSetting(record) {
  return _unsafeGetNoWorkerJobConfig(record)[/* setting */0];
}

function _getExecutableJob(jobs, param) {
  var pipelineJobName = param[/* name */0];
  var match = JobConfigService$Wonderjs.unsafeFindFirst(jobs, pipelineJobName, (function (param) {
          return JobConfigService$Wonderjs.filterTargetName(param[/* name */0], pipelineJobName);
        }));
  return /* record */[
          /* name */pipelineJobName,
          /* flags */match[/* flags */1]
        ];
}

function _getPipelineExecutableJobs(pipeline, pipelines, jobs) {
  var pipelineItem = JobConfigService$Wonderjs.unsafeFindFirst(pipelines, pipeline, (function (param) {
          return JobConfigService$Wonderjs.filterTargetName(param[/* name */0], pipeline);
        }));
  return pipelineItem[/* jobs */1].map((function (param) {
                return _getExecutableJob(jobs, param);
              }));
}

function getInitPipelineExecutableJobs(param, initPipelines, jobs) {
  return _getPipelineExecutableJobs(param[/* initPipeline */0], initPipelines, jobs);
}

function getLoopPipelineExecutableJobs(param, loopPipelines, jobs) {
  return _getPipelineExecutableJobs(param[/* loopPipeline */1], loopPipelines, jobs);
}

export {
  _unsafeGetNoWorkerJobConfig ,
  getInitPipelines ,
  getInitJobs ,
  getLoopPipelines ,
  getLoopJobs ,
  getSetting ,
  _getExecutableJob ,
  _getPipelineExecutableJobs ,
  getInitPipelineExecutableJobs ,
  getLoopPipelineExecutableJobs ,
  
}
/* Log-WonderLog Not a pure module */
