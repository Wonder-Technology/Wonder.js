

import * as Curry from "../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Caml_array from "../../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as MutableHashMapService$Wonderjs from "../../../../atom/MutableHashMapService.js";
import * as MutableHashMapService$WonderCommonlib from "../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableHashMapService.js";
import * as OperateRenderWorkerJobService$Wonderjs from "../../../../record/main/workerJob/OperateRenderWorkerJobService.js";
import * as OperateMainInitWorkerJobMainService$Wonderjs from "./OperateMainInitWorkerJobMainService.js";
import * as OperateMainLoopWorkerJobMainService$Wonderjs from "./OperateMainLoopWorkerJobMainService.js";

function getMainInitJobStream(stateData, param, state) {
  return OperateMainInitWorkerJobMainService$Wonderjs.getMainInitJobStream(Curry._1(param[0], /* () */0), stateData, param[1], state);
}

function getMainLoopJobStream(stateData, param, state) {
  return OperateMainLoopWorkerJobMainService$Wonderjs.getMainLoopJobStream(Curry._1(param[0], /* () */0), stateData, param[1], state);
}

function getRenderWorkerJobStreamArr(pipelineJobs, workerJobs, param, stateData) {
  return OperateRenderWorkerJobService$Wonderjs.getRenderWorkerJobStreamArr(/* tuple */[
              pipelineJobs,
              workerJobs
            ], Curry._1(param[0], /* () */0), stateData, param[1]);
}

function addWorkerMainInitJob(param, action, targetHandleFunc, state) {
  var sourceJobName = param[1];
  var targetJobName = param[0];
  var newrecord = Caml_array.caml_array_dup(state);
  var init = state[/* jobRecord */1];
  newrecord[/* jobRecord */1] = /* record */[
    /* noWorkerInitJobList */init[/* noWorkerInitJobList */0],
    /* noWorkerLoopJobList */init[/* noWorkerLoopJobList */1],
    /* noWorkerCustomInitJobHandleMap */init[/* noWorkerCustomInitJobHandleMap */2],
    /* noWorkerCustomLoopJobHandleMap */init[/* noWorkerCustomLoopJobHandleMap */3],
    /* workerCustomMainInitTargetJobMap */MutableHashMapService$WonderCommonlib.set(sourceJobName, /* tuple */[
          targetJobName,
          action,
          targetHandleFunc
        ], state[/* jobRecord */1][/* workerCustomMainInitTargetJobMap */4]),
    /* workerCustomMainInitSourceJobMap */MutableHashMapService$WonderCommonlib.set(targetJobName, sourceJobName, state[/* jobRecord */1][/* workerCustomMainInitSourceJobMap */5]),
    /* workerCustomMainInitRemovedDefaultJobMap */init[/* workerCustomMainInitRemovedDefaultJobMap */6],
    /* workerCustomMainLoopTargetJobMap */init[/* workerCustomMainLoopTargetJobMap */7],
    /* workerCustomMainLoopSourceJobMap */init[/* workerCustomMainLoopSourceJobMap */8],
    /* workerCustomMainLoopRemovedDefaultJobMap */init[/* workerCustomMainLoopRemovedDefaultJobMap */9]
  ];
  return newrecord;
}

function removeWorkerMainInitJob(targetJobName, state) {
  var match = MutableHashMapService$WonderCommonlib.get(targetJobName, state[/* jobRecord */1][/* workerCustomMainInitSourceJobMap */5]);
  if (match !== undefined) {
    var newrecord = Caml_array.caml_array_dup(state);
    var init = state[/* jobRecord */1];
    newrecord[/* jobRecord */1] = /* record */[
      /* noWorkerInitJobList */init[/* noWorkerInitJobList */0],
      /* noWorkerLoopJobList */init[/* noWorkerLoopJobList */1],
      /* noWorkerCustomInitJobHandleMap */init[/* noWorkerCustomInitJobHandleMap */2],
      /* noWorkerCustomLoopJobHandleMap */init[/* noWorkerCustomLoopJobHandleMap */3],
      /* workerCustomMainInitTargetJobMap */MutableHashMapService$Wonderjs.deleteValFromMap(match, state[/* jobRecord */1][/* workerCustomMainInitTargetJobMap */4]),
      /* workerCustomMainInitSourceJobMap */init[/* workerCustomMainInitSourceJobMap */5],
      /* workerCustomMainInitRemovedDefaultJobMap */init[/* workerCustomMainInitRemovedDefaultJobMap */6],
      /* workerCustomMainLoopTargetJobMap */init[/* workerCustomMainLoopTargetJobMap */7],
      /* workerCustomMainLoopSourceJobMap */init[/* workerCustomMainLoopSourceJobMap */8],
      /* workerCustomMainLoopRemovedDefaultJobMap */init[/* workerCustomMainLoopRemovedDefaultJobMap */9]
    ];
    return newrecord;
  } else {
    var newrecord$1 = Caml_array.caml_array_dup(state);
    var init$1 = state[/* jobRecord */1];
    newrecord$1[/* jobRecord */1] = /* record */[
      /* noWorkerInitJobList */init$1[/* noWorkerInitJobList */0],
      /* noWorkerLoopJobList */init$1[/* noWorkerLoopJobList */1],
      /* noWorkerCustomInitJobHandleMap */init$1[/* noWorkerCustomInitJobHandleMap */2],
      /* noWorkerCustomLoopJobHandleMap */init$1[/* noWorkerCustomLoopJobHandleMap */3],
      /* workerCustomMainInitTargetJobMap */init$1[/* workerCustomMainInitTargetJobMap */4],
      /* workerCustomMainInitSourceJobMap */init$1[/* workerCustomMainInitSourceJobMap */5],
      /* workerCustomMainInitRemovedDefaultJobMap */MutableHashMapService$WonderCommonlib.set(targetJobName, true, state[/* jobRecord */1][/* workerCustomMainInitRemovedDefaultJobMap */6]),
      /* workerCustomMainLoopTargetJobMap */init$1[/* workerCustomMainLoopTargetJobMap */7],
      /* workerCustomMainLoopSourceJobMap */init$1[/* workerCustomMainLoopSourceJobMap */8],
      /* workerCustomMainLoopRemovedDefaultJobMap */init$1[/* workerCustomMainLoopRemovedDefaultJobMap */9]
    ];
    return newrecord$1;
  }
}

function addWorkerMainLoopJob(param, action, targetHandleFunc, state) {
  var sourceJobName = param[1];
  var targetJobName = param[0];
  var newrecord = Caml_array.caml_array_dup(state);
  var init = state[/* jobRecord */1];
  newrecord[/* jobRecord */1] = /* record */[
    /* noWorkerInitJobList */init[/* noWorkerInitJobList */0],
    /* noWorkerLoopJobList */init[/* noWorkerLoopJobList */1],
    /* noWorkerCustomInitJobHandleMap */init[/* noWorkerCustomInitJobHandleMap */2],
    /* noWorkerCustomLoopJobHandleMap */init[/* noWorkerCustomLoopJobHandleMap */3],
    /* workerCustomMainInitTargetJobMap */init[/* workerCustomMainInitTargetJobMap */4],
    /* workerCustomMainInitSourceJobMap */init[/* workerCustomMainInitSourceJobMap */5],
    /* workerCustomMainInitRemovedDefaultJobMap */init[/* workerCustomMainInitRemovedDefaultJobMap */6],
    /* workerCustomMainLoopTargetJobMap */MutableHashMapService$WonderCommonlib.set(sourceJobName, /* tuple */[
          targetJobName,
          action,
          targetHandleFunc
        ], state[/* jobRecord */1][/* workerCustomMainLoopTargetJobMap */7]),
    /* workerCustomMainLoopSourceJobMap */MutableHashMapService$WonderCommonlib.set(targetJobName, sourceJobName, state[/* jobRecord */1][/* workerCustomMainLoopSourceJobMap */8]),
    /* workerCustomMainLoopRemovedDefaultJobMap */init[/* workerCustomMainLoopRemovedDefaultJobMap */9]
  ];
  return newrecord;
}

function removeWorkerMainLoopJob(targetJobName, state) {
  var match = MutableHashMapService$WonderCommonlib.get(targetJobName, state[/* jobRecord */1][/* workerCustomMainLoopSourceJobMap */8]);
  if (match !== undefined) {
    var newrecord = Caml_array.caml_array_dup(state);
    var init = state[/* jobRecord */1];
    newrecord[/* jobRecord */1] = /* record */[
      /* noWorkerInitJobList */init[/* noWorkerInitJobList */0],
      /* noWorkerLoopJobList */init[/* noWorkerLoopJobList */1],
      /* noWorkerCustomInitJobHandleMap */init[/* noWorkerCustomInitJobHandleMap */2],
      /* noWorkerCustomLoopJobHandleMap */init[/* noWorkerCustomLoopJobHandleMap */3],
      /* workerCustomMainInitTargetJobMap */init[/* workerCustomMainInitTargetJobMap */4],
      /* workerCustomMainInitSourceJobMap */init[/* workerCustomMainInitSourceJobMap */5],
      /* workerCustomMainInitRemovedDefaultJobMap */init[/* workerCustomMainInitRemovedDefaultJobMap */6],
      /* workerCustomMainLoopTargetJobMap */MutableHashMapService$Wonderjs.deleteValFromMap(match, state[/* jobRecord */1][/* workerCustomMainLoopTargetJobMap */7]),
      /* workerCustomMainLoopSourceJobMap */init[/* workerCustomMainLoopSourceJobMap */8],
      /* workerCustomMainLoopRemovedDefaultJobMap */init[/* workerCustomMainLoopRemovedDefaultJobMap */9]
    ];
    return newrecord;
  } else {
    var newrecord$1 = Caml_array.caml_array_dup(state);
    var init$1 = state[/* jobRecord */1];
    newrecord$1[/* jobRecord */1] = /* record */[
      /* noWorkerInitJobList */init$1[/* noWorkerInitJobList */0],
      /* noWorkerLoopJobList */init$1[/* noWorkerLoopJobList */1],
      /* noWorkerCustomInitJobHandleMap */init$1[/* noWorkerCustomInitJobHandleMap */2],
      /* noWorkerCustomLoopJobHandleMap */init$1[/* noWorkerCustomLoopJobHandleMap */3],
      /* workerCustomMainInitTargetJobMap */init$1[/* workerCustomMainInitTargetJobMap */4],
      /* workerCustomMainInitSourceJobMap */init$1[/* workerCustomMainInitSourceJobMap */5],
      /* workerCustomMainInitRemovedDefaultJobMap */init$1[/* workerCustomMainInitRemovedDefaultJobMap */6],
      /* workerCustomMainLoopTargetJobMap */init$1[/* workerCustomMainLoopTargetJobMap */7],
      /* workerCustomMainLoopSourceJobMap */init$1[/* workerCustomMainLoopSourceJobMap */8],
      /* workerCustomMainLoopRemovedDefaultJobMap */MutableHashMapService$WonderCommonlib.set(targetJobName, true, state[/* jobRecord */1][/* workerCustomMainLoopRemovedDefaultJobMap */9])
    ];
    return newrecord$1;
  }
}

export {
  getMainInitJobStream ,
  getMainLoopJobStream ,
  getRenderWorkerJobStreamArr ,
  addWorkerMainInitJob ,
  removeWorkerMainInitJob ,
  addWorkerMainLoopJob ,
  removeWorkerMainLoopJob ,
  
}
/* OperateRenderWorkerJobService-Wonderjs Not a pure module */
