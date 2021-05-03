

import * as List from "./../../../../../../../../node_modules/bs-platform/lib/es6/list.js";
import * as Curry from "./../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Caml_array from "./../../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Pervasives from "./../../../../../../../../node_modules/bs-platform/lib/es6/pervasives.js";
import * as JobService$Wonderjs from "../../../../primitive/job/JobService.js";
import * as HandleJobService$Wonderjs from "../../../../primitive/job/HandleJobService.js";
import * as ArrayService$WonderCommonlib from "./../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as OperateNoWorkerJobService$Wonderjs from "../../../../record/main/noWorkerJob/OperateNoWorkerJobService.js";
import * as MutableHashMapService$WonderCommonlib from "./../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableHashMapService.js";

function _getAllNoWorkerJobs(executableJobs, jobHandleMap, state) {
  return ArrayService$WonderCommonlib.reduceOneParam((function (list, param) {
                var name = param[/* name */0];
                var match = MutableHashMapService$WonderCommonlib.get(name, jobHandleMap);
                if (match !== undefined) {
                  return Pervasives.$at(list, /* :: */[
                              /* tuple */[
                                name,
                                Curry._1(match, param[/* flags */1])
                              ],
                              /* [] */0
                            ]);
                } else {
                  return JobService$Wonderjs.handleGetNoneNoWorkerJob(name, list);
                }
              }), /* [] */0, executableJobs);
}

function _getNoWorkerInitJobList(state) {
  return state[/* jobRecord */1][/* noWorkerInitJobList */0];
}

function _getNoWorkerLoopJobList(state) {
  return state[/* jobRecord */1][/* noWorkerLoopJobList */1];
}

function execNoWorkerInitJobs(state) {
  return List.fold_left((function (state, param) {
                return Curry._1(param[1], state);
              }), state, state[/* jobRecord */1][/* noWorkerInitJobList */0]);
}

function execNoWorkerLoopJobs(state) {
  return List.fold_left((function (state, param) {
                return Curry._1(param[1], state);
              }), state, state[/* jobRecord */1][/* noWorkerLoopJobList */1]);
}

function init(param, state) {
  var jobRecord = state[/* jobRecord */1];
  var newrecord = Caml_array.caml_array_dup(state);
  var __x = Curry._1(param[0], /* () */0);
  var __x$1 = Curry._1(param[1], /* () */0);
  newrecord[/* jobRecord */1] = /* record */[
    /* noWorkerInitJobList */_getAllNoWorkerJobs(OperateNoWorkerJobService$Wonderjs.getInitPipelineExecutableJobs(OperateNoWorkerJobService$Wonderjs.getSetting(state[/* noWorkerJobRecord */2]), OperateNoWorkerJobService$Wonderjs.getInitPipelines(state[/* noWorkerJobRecord */2]), OperateNoWorkerJobService$Wonderjs.getInitJobs(state[/* noWorkerJobRecord */2])), HandleJobService$Wonderjs.concatJobHandleMaps(__x, jobRecord[/* noWorkerCustomInitJobHandleMap */2]), state),
    /* noWorkerLoopJobList */_getAllNoWorkerJobs(OperateNoWorkerJobService$Wonderjs.getLoopPipelineExecutableJobs(OperateNoWorkerJobService$Wonderjs.getSetting(state[/* noWorkerJobRecord */2]), OperateNoWorkerJobService$Wonderjs.getLoopPipelines(state[/* noWorkerJobRecord */2]), OperateNoWorkerJobService$Wonderjs.getLoopJobs(state[/* noWorkerJobRecord */2])), HandleJobService$Wonderjs.concatJobHandleMaps(__x$1, jobRecord[/* noWorkerCustomLoopJobHandleMap */3]), state),
    /* noWorkerCustomInitJobHandleMap */jobRecord[/* noWorkerCustomInitJobHandleMap */2],
    /* noWorkerCustomLoopJobHandleMap */jobRecord[/* noWorkerCustomLoopJobHandleMap */3],
    /* workerCustomMainInitTargetJobMap */jobRecord[/* workerCustomMainInitTargetJobMap */4],
    /* workerCustomMainInitSourceJobMap */jobRecord[/* workerCustomMainInitSourceJobMap */5],
    /* workerCustomMainInitRemovedDefaultJobMap */jobRecord[/* workerCustomMainInitRemovedDefaultJobMap */6],
    /* workerCustomMainLoopTargetJobMap */jobRecord[/* workerCustomMainLoopTargetJobMap */7],
    /* workerCustomMainLoopSourceJobMap */jobRecord[/* workerCustomMainLoopSourceJobMap */8],
    /* workerCustomMainLoopRemovedDefaultJobMap */jobRecord[/* workerCustomMainLoopRemovedDefaultJobMap */9]
  ];
  return newrecord;
}

function registerNoWorkerInitJob(jobName, handleFunc, state) {
  var jobRecord = state[/* jobRecord */1];
  var newrecord = Caml_array.caml_array_dup(state);
  var init = state[/* jobRecord */1];
  newrecord[/* jobRecord */1] = /* record */[
    /* noWorkerInitJobList */init[/* noWorkerInitJobList */0],
    /* noWorkerLoopJobList */init[/* noWorkerLoopJobList */1],
    /* noWorkerCustomInitJobHandleMap */MutableHashMapService$WonderCommonlib.set(jobName, handleFunc, jobRecord[/* noWorkerCustomInitJobHandleMap */2]),
    /* noWorkerCustomLoopJobHandleMap */init[/* noWorkerCustomLoopJobHandleMap */3],
    /* workerCustomMainInitTargetJobMap */init[/* workerCustomMainInitTargetJobMap */4],
    /* workerCustomMainInitSourceJobMap */init[/* workerCustomMainInitSourceJobMap */5],
    /* workerCustomMainInitRemovedDefaultJobMap */init[/* workerCustomMainInitRemovedDefaultJobMap */6],
    /* workerCustomMainLoopTargetJobMap */init[/* workerCustomMainLoopTargetJobMap */7],
    /* workerCustomMainLoopSourceJobMap */init[/* workerCustomMainLoopSourceJobMap */8],
    /* workerCustomMainLoopRemovedDefaultJobMap */init[/* workerCustomMainLoopRemovedDefaultJobMap */9]
  ];
  return newrecord;
}

function registerNoWorkerLoopJob(jobName, handleFunc, state) {
  var jobRecord = state[/* jobRecord */1];
  var newrecord = Caml_array.caml_array_dup(state);
  var init = state[/* jobRecord */1];
  newrecord[/* jobRecord */1] = /* record */[
    /* noWorkerInitJobList */init[/* noWorkerInitJobList */0],
    /* noWorkerLoopJobList */init[/* noWorkerLoopJobList */1],
    /* noWorkerCustomInitJobHandleMap */init[/* noWorkerCustomInitJobHandleMap */2],
    /* noWorkerCustomLoopJobHandleMap */MutableHashMapService$WonderCommonlib.set(jobName, handleFunc, jobRecord[/* noWorkerCustomLoopJobHandleMap */3]),
    /* workerCustomMainInitTargetJobMap */init[/* workerCustomMainInitTargetJobMap */4],
    /* workerCustomMainInitSourceJobMap */init[/* workerCustomMainInitSourceJobMap */5],
    /* workerCustomMainInitRemovedDefaultJobMap */init[/* workerCustomMainInitRemovedDefaultJobMap */6],
    /* workerCustomMainLoopTargetJobMap */init[/* workerCustomMainLoopTargetJobMap */7],
    /* workerCustomMainLoopSourceJobMap */init[/* workerCustomMainLoopSourceJobMap */8],
    /* workerCustomMainLoopRemovedDefaultJobMap */init[/* workerCustomMainLoopRemovedDefaultJobMap */9]
  ];
  return newrecord;
}

function addNoWorkerInitJob(param, action, targetHandleFunc, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  var init = state[/* jobRecord */1];
  newrecord[/* jobRecord */1] = /* record */[
    /* noWorkerInitJobList */JobService$Wonderjs.addJob(/* tuple */[
          param[0],
          param[1],
          action,
          targetHandleFunc
        ], state[/* jobRecord */1][/* noWorkerInitJobList */0]),
    /* noWorkerLoopJobList */init[/* noWorkerLoopJobList */1],
    /* noWorkerCustomInitJobHandleMap */init[/* noWorkerCustomInitJobHandleMap */2],
    /* noWorkerCustomLoopJobHandleMap */init[/* noWorkerCustomLoopJobHandleMap */3],
    /* workerCustomMainInitTargetJobMap */init[/* workerCustomMainInitTargetJobMap */4],
    /* workerCustomMainInitSourceJobMap */init[/* workerCustomMainInitSourceJobMap */5],
    /* workerCustomMainInitRemovedDefaultJobMap */init[/* workerCustomMainInitRemovedDefaultJobMap */6],
    /* workerCustomMainLoopTargetJobMap */init[/* workerCustomMainLoopTargetJobMap */7],
    /* workerCustomMainLoopSourceJobMap */init[/* workerCustomMainLoopSourceJobMap */8],
    /* workerCustomMainLoopRemovedDefaultJobMap */init[/* workerCustomMainLoopRemovedDefaultJobMap */9]
  ];
  return newrecord;
}

function addNoWorkerLoopJob(param, action, targetHandleFunc, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  var init = state[/* jobRecord */1];
  newrecord[/* jobRecord */1] = /* record */[
    /* noWorkerInitJobList */init[/* noWorkerInitJobList */0],
    /* noWorkerLoopJobList */JobService$Wonderjs.addJob(/* tuple */[
          param[0],
          param[1],
          action,
          targetHandleFunc
        ], state[/* jobRecord */1][/* noWorkerLoopJobList */1]),
    /* noWorkerCustomInitJobHandleMap */init[/* noWorkerCustomInitJobHandleMap */2],
    /* noWorkerCustomLoopJobHandleMap */init[/* noWorkerCustomLoopJobHandleMap */3],
    /* workerCustomMainInitTargetJobMap */init[/* workerCustomMainInitTargetJobMap */4],
    /* workerCustomMainInitSourceJobMap */init[/* workerCustomMainInitSourceJobMap */5],
    /* workerCustomMainInitRemovedDefaultJobMap */init[/* workerCustomMainInitRemovedDefaultJobMap */6],
    /* workerCustomMainLoopTargetJobMap */init[/* workerCustomMainLoopTargetJobMap */7],
    /* workerCustomMainLoopSourceJobMap */init[/* workerCustomMainLoopSourceJobMap */8],
    /* workerCustomMainLoopRemovedDefaultJobMap */init[/* workerCustomMainLoopRemovedDefaultJobMap */9]
  ];
  return newrecord;
}

function removeNoWorkerInitJob(targetJobName, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  var init = state[/* jobRecord */1];
  newrecord[/* jobRecord */1] = /* record */[
    /* noWorkerInitJobList */JobService$Wonderjs.removeJob(targetJobName, state[/* jobRecord */1][/* noWorkerInitJobList */0]),
    /* noWorkerLoopJobList */init[/* noWorkerLoopJobList */1],
    /* noWorkerCustomInitJobHandleMap */init[/* noWorkerCustomInitJobHandleMap */2],
    /* noWorkerCustomLoopJobHandleMap */init[/* noWorkerCustomLoopJobHandleMap */3],
    /* workerCustomMainInitTargetJobMap */init[/* workerCustomMainInitTargetJobMap */4],
    /* workerCustomMainInitSourceJobMap */init[/* workerCustomMainInitSourceJobMap */5],
    /* workerCustomMainInitRemovedDefaultJobMap */init[/* workerCustomMainInitRemovedDefaultJobMap */6],
    /* workerCustomMainLoopTargetJobMap */init[/* workerCustomMainLoopTargetJobMap */7],
    /* workerCustomMainLoopSourceJobMap */init[/* workerCustomMainLoopSourceJobMap */8],
    /* workerCustomMainLoopRemovedDefaultJobMap */init[/* workerCustomMainLoopRemovedDefaultJobMap */9]
  ];
  return newrecord;
}

function removeNoWorkerLoopJob(targetJobName, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  var init = state[/* jobRecord */1];
  newrecord[/* jobRecord */1] = /* record */[
    /* noWorkerInitJobList */init[/* noWorkerInitJobList */0],
    /* noWorkerLoopJobList */JobService$Wonderjs.removeJob(targetJobName, state[/* jobRecord */1][/* noWorkerLoopJobList */1]),
    /* noWorkerCustomInitJobHandleMap */init[/* noWorkerCustomInitJobHandleMap */2],
    /* noWorkerCustomLoopJobHandleMap */init[/* noWorkerCustomLoopJobHandleMap */3],
    /* workerCustomMainInitTargetJobMap */init[/* workerCustomMainInitTargetJobMap */4],
    /* workerCustomMainInitSourceJobMap */init[/* workerCustomMainInitSourceJobMap */5],
    /* workerCustomMainInitRemovedDefaultJobMap */init[/* workerCustomMainInitRemovedDefaultJobMap */6],
    /* workerCustomMainLoopTargetJobMap */init[/* workerCustomMainLoopTargetJobMap */7],
    /* workerCustomMainLoopSourceJobMap */init[/* workerCustomMainLoopSourceJobMap */8],
    /* workerCustomMainLoopRemovedDefaultJobMap */init[/* workerCustomMainLoopRemovedDefaultJobMap */9]
  ];
  return newrecord;
}

export {
  _getAllNoWorkerJobs ,
  _getNoWorkerInitJobList ,
  _getNoWorkerLoopJobList ,
  execNoWorkerInitJobs ,
  execNoWorkerLoopJobs ,
  init ,
  registerNoWorkerInitJob ,
  registerNoWorkerLoopJob ,
  addNoWorkerInitJob ,
  addNoWorkerLoopJob ,
  removeNoWorkerInitJob ,
  removeNoWorkerLoopJob ,
  
}
/* JobService-Wonderjs Not a pure module */
