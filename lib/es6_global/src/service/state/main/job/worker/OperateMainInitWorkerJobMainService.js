

import * as Most from "most";
import * as Curry from "../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Log$WonderLog from "../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as MostUtils$Wonderjs from "../../../../../asset/utils/MostUtils.js";
import * as ArrayService$Wonderjs from "../../../../atom/ArrayService.js";
import * as OptionService$Wonderjs from "../../../../atom/OptionService.js";
import * as StateDataMain$Wonderjs from "../../data/StateDataMain.js";
import * as JobConfigService$Wonderjs from "../../../../primitive/JobConfigService.js";
import * as IsDebugMainService$Wonderjs from "../../state/IsDebugMainService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as MutableHashMapService$WonderCommonlib from "../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableHashMapService.js";
import * as OperateMainWorkerJobMainService$Wonderjs from "./OperateMainWorkerJobMainService.js";

function _buildStreamArr(param, findFunc, getJobHandleFunc, state) {
  var jobs = param[4];
  var stateData = param[3];
  var pipelineJobs = param[1];
  var jobHandleMap = param[0];
  return ArrayService$WonderCommonlib.reduceOneParam((function (streamArr, param) {
                var subJobName = param[/* name */0];
                var match = JobConfigService$Wonderjs.findFirst(pipelineJobs, subJobName, (function (param) {
                        return JobConfigService$Wonderjs.filterTargetName(param[/* name */0], subJobName);
                      }));
                if (match !== undefined) {
                  return OperateMainWorkerJobMainService$Wonderjs.addCustomJobHandleToStreamArr(subJobName, /* array */[], state[/* jobRecord */1][/* workerCustomMainInitTargetJobMap */4], stateData, ArrayService$Wonderjs.push(Curry._3(findFunc, /* tuple */[
                                      match,
                                      pipelineJobs,
                                      jobHandleMap,
                                      jobs,
                                      stateData
                                    ], getJobHandleFunc, state), streamArr));
                } else {
                  var match$1 = OperateMainWorkerJobMainService$Wonderjs.getExecutableJob(jobs, subJobName);
                  var handleFunc = Curry._2(getJobHandleFunc, subJobName, jobHandleMap);
                  return OperateMainWorkerJobMainService$Wonderjs.addCustomJobHandleToStreamArr(subJobName, /* array */[Curry._2(handleFunc, match$1[/* flags */1], stateData)], state[/* jobRecord */1][/* workerCustomMainInitTargetJobMap */4], stateData, streamArr);
                }
              }), /* array */[], param[2].filter((function (param) {
                    return !MutableHashMapService$WonderCommonlib.has(param[/* name */0], state[/* jobRecord */1][/* workerCustomMainInitRemovedDefaultJobMap */6]);
                  })));
}

function _find(param, getJobHandleFunc, state) {
  var stateData = param[4];
  var mainInitJobs = param[3];
  var jobHandleMap = param[2];
  var pipelineJobs = param[1];
  var match = param[0];
  var pipelineSubJobs = match[/* jobs */2];
  var link = match[/* link */1];
  switch (link) {
    case "concat" : 
        return MostUtils$Wonderjs.concatArray(_buildStreamArr(/* tuple */[
                        jobHandleMap,
                        pipelineJobs,
                        pipelineSubJobs,
                        stateData,
                        mainInitJobs
                      ], _find, getJobHandleFunc, state));
    case "merge" : 
        return Most.mergeArray(_buildStreamArr(/* tuple */[
                        jobHandleMap,
                        pipelineJobs,
                        pipelineSubJobs,
                        stateData,
                        mainInitJobs
                      ], _find, getJobHandleFunc, state));
    default:
      return Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("_find", "invalid link: " + (String(link) + ""), "", "", ""));
  }
}

function _getFrameJobName(param) {
  return "frame";
}

function _findFrameJob(jobs) {
  Contract$WonderLog.requireCheck((function (param) {
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("frame job only has one", "not"), (function (param) {
                        return Contract$WonderLog.Operators[/* = */0](jobs.filter((function (param) {
                                          return JobConfigService$Wonderjs.filterTargetName(param[/* name */0], "frame");
                                        })).length, 1);
                      }));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  var jobName = "frame";
  return JobConfigService$Wonderjs.unsafeFindFirst(jobs, jobName, (function (param) {
                return JobConfigService$Wonderjs.filterTargetName(param[/* name */0], jobName);
              }));
}

function getMainInitJobStream(jobHandleMap, stateData, getJobHandleFunc, state) {
  var match = OptionService$Wonderjs.unsafeGet(state[/* workerJobRecord */3]);
  var setting = match[/* setting */0];
  var match$1 = JobConfigService$Wonderjs.unsafeFindFirst(match[/* mainInitPipelines */1], setting[/* mainInitPipeline */1], (function (param) {
          return JobConfigService$Wonderjs.filterTargetName(param[/* name */0], setting[/* mainInitPipeline */1]);
        }));
  var jobs = match$1[/* jobs */1];
  return _find(/* tuple */[
              _findFrameJob(jobs),
              jobs,
              jobHandleMap,
              match[/* mainInitJobs */4],
              stateData
            ], getJobHandleFunc, state);
}

export {
  _buildStreamArr ,
  _find ,
  _getFrameJobName ,
  _findFrameJob ,
  getMainInitJobStream ,
  
}
/* most Not a pure module */
