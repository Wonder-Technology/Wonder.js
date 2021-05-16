

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Log$WonderLog from "../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "../../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as MostUtils$Wonderjs from "../../../../asset/utils/MostUtils.js";
import * as ArrayService$Wonderjs from "../../../atom/ArrayService.js";
import * as OptionService$Wonderjs from "../../../atom/OptionService.js";
import * as StateDataMain$Wonderjs from "../../../state/main/data/StateDataMain.js";
import * as JobConfigService$Wonderjs from "../../../primitive/JobConfigService.js";
import * as IsDebugMainService$Wonderjs from "../../../state/main/state/IsDebugMainService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";

function _unsafeGetWorkerJobConfig(record) {
  Contract$WonderLog.requireCheck((function (param) {
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("render job config exist", "not"), (function (param) {
                        return Contract$WonderLog.assertExist(record);
                      }));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return OptionService$Wonderjs.unsafeGet(record);
}

function getSetting(record) {
  return _unsafeGetWorkerJobConfig(record)[/* setting */0];
}

function _getRenderWorkerPipelineJobs(workerPipeline, workerPipelines) {
  return JobConfigService$Wonderjs.unsafeFindFirst(workerPipelines, workerPipeline, (function (param) {
                    return JobConfigService$Wonderjs.filterTargetName(param[/* name */0], workerPipeline);
                  }))[/* jobs */1][/* render */0];
}

function getRenderWorkerPipelineJobs(record) {
  var match = _unsafeGetWorkerJobConfig(record);
  return _getRenderWorkerPipelineJobs(match[/* setting */0][/* workerPipeline */3], match[/* workerPipelines */3]);
}

function getWorkerJobs(record) {
  return _unsafeGetWorkerJobConfig(record)[/* workerJobs */6];
}

function _getExecutableWorkerJob(jobs, jobItemName) {
  return JobConfigService$Wonderjs.unsafeFindFirst(jobs, jobItemName, (function (param) {
                return JobConfigService$Wonderjs.filterTargetName(param[/* name */0], jobItemName);
              }));
}

function _buildWorkerStreamFuncArr(param, getJobHandleFunc) {
  var jobs = param[3];
  var jobHandleMap = param[0];
  return ArrayService$WonderCommonlib.reduceOneParam((function (streamArr, job) {
                var jobName = job[/* name */0];
                var match = _getExecutableWorkerJob(jobs, jobName);
                var handleFunc = Curry._2(getJobHandleFunc, jobName, jobHandleMap);
                return ArrayService$Wonderjs.push(Curry._1(handleFunc, match[/* flags */1]), streamArr);
              }), /* array */[], param[1]);
}

function getRenderWorkerJobStreamArr(param, jobHandleMap, stateData, getJobHandleFunc) {
  var workerJobs = param[1];
  return ArrayService$WonderCommonlib.reduceOneParam((function (streamArr, pipelineSubJobs) {
                return ArrayService$Wonderjs.push(MostUtils$Wonderjs.concatStreamFuncArray(stateData, _buildWorkerStreamFuncArr(/* tuple */[
                                    jobHandleMap,
                                    pipelineSubJobs,
                                    stateData,
                                    workerJobs
                                  ], getJobHandleFunc)), streamArr);
              }), /* array */[], param[0]);
}

export {
  _unsafeGetWorkerJobConfig ,
  getSetting ,
  _getRenderWorkerPipelineJobs ,
  getRenderWorkerPipelineJobs ,
  getWorkerJobs ,
  _getExecutableWorkerJob ,
  _buildWorkerStreamFuncArr ,
  getRenderWorkerJobStreamArr ,
  
}
/* Log-WonderLog Not a pure module */
