

import * as Most from "most";
import * as StateDataMain$Wonderjs from "../data/StateDataMain.js";
import * as WonderMostAnimationFrame from "wonder-most-animation-frame";
import * as StateDataMainService$Wonderjs from "../state/StateDataMainService.js";
import * as WorkerJobMainService$Wonderjs from "../job/worker/WorkerJobMainService.js";
import * as TimeControllerService$Wonderjs from "../../../record/main/timeController/TimeControllerService.js";
import * as WorkerJobHandleSystem$Wonderjs from "../../../../job/worker/WorkerJobHandleSystem.js";
import * as NoWorkerJobMainService$Wonderjs from "../job/no_worker/NoWorkerJobMainService.js";
import * as NoWorkerJobHandleSystem$Wonderjs from "../../../../job/no_worker/NoWorkerJobHandleSystem.js";
import * as WorkerDetectMainService$Wonderjs from "../workerDetect/WorkerDetectMainService.js";

function _workerInit(stateData, state) {
  return WorkerJobMainService$Wonderjs.getMainInitJobStream(stateData, /* tuple */[
              WorkerJobHandleSystem$Wonderjs.createMainInitJobHandleMap,
              WorkerJobHandleSystem$Wonderjs.getMainInitJobHandle
            ], state);
}

function _noWorkerInit(state) {
  return NoWorkerJobMainService$Wonderjs.execNoWorkerInitJobs(NoWorkerJobMainService$Wonderjs.init(/* tuple */[
                  NoWorkerJobHandleSystem$Wonderjs.createInitJobHandleMap,
                  NoWorkerJobHandleSystem$Wonderjs.createLoopJobHandleMap
                ], state));
}

function _computeElapseTime(time, state) {
  state[/* timeControllerRecord */35] = TimeControllerService$Wonderjs.computeElapseTime(time, state[/* timeControllerRecord */35]);
  return state;
}

function _createWorkerLoopStream(param) {
  return Most.continueWith((function (param) {
                return _createWorkerLoopStream(/* () */0);
              }), Most.flatMap((function (time) {
                    var state = _computeElapseTime(time, StateDataMainService$Wonderjs.unsafeGetState(StateDataMain$Wonderjs.stateData));
                    return Most.map((function (e) {
                                  return /* () */0;
                                }), WorkerJobMainService$Wonderjs.getMainLoopJobStream(StateDataMain$Wonderjs.stateData, /* tuple */[
                                    WorkerJobHandleSystem$Wonderjs.createMainLoopJobHandleMap,
                                    WorkerJobHandleSystem$Wonderjs.getMainLoopJobHandle
                                  ], state));
                  }), WonderMostAnimationFrame.nextAnimationFrame()));
}

function _run(time, state) {
  return NoWorkerJobMainService$Wonderjs.execNoWorkerLoopJobs(_computeElapseTime(time, state));
}

function loopBody(time, state) {
  return NoWorkerJobMainService$Wonderjs.execNoWorkerLoopJobs(_computeElapseTime(time, state));
}

function _noWorkerLoop(time) {
  return requestAnimationFrame((function (time) {
                var state = StateDataMainService$Wonderjs.unsafeGetState(StateDataMain$Wonderjs.stateData);
                StateDataMainService$Wonderjs.setState(StateDataMain$Wonderjs.stateData, NoWorkerJobMainService$Wonderjs.execNoWorkerLoopJobs(_computeElapseTime(time, state)));
                _noWorkerLoop(time);
                return /* () */0;
              }));
}

function start(state) {
  var match = WorkerDetectMainService$Wonderjs.isUseWorker(state);
  if (match) {
    Most.drain(_workerInit(StateDataMain$Wonderjs.stateData, StateDataMainService$Wonderjs.setState(StateDataMain$Wonderjs.stateData, state)).concat(_createWorkerLoopStream(/* () */0)));
    return /* () */0;
  } else {
    StateDataMainService$Wonderjs.setState(StateDataMain$Wonderjs.stateData, _noWorkerInit(state));
    _noWorkerLoop(0);
    return /* () */0;
  }
}

var init = _noWorkerInit;

export {
  _workerInit ,
  _noWorkerInit ,
  _computeElapseTime ,
  _createWorkerLoopStream ,
  _run ,
  init ,
  loopBody ,
  _noWorkerLoop ,
  start ,
  
}
/* most Not a pure module */
