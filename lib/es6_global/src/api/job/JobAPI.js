

import * as WorkerJobMainService$Wonderjs from "../../service/state/main/job/worker/WorkerJobMainService.js";
import * as NoWorkerJobMainService$Wonderjs from "../../service/state/main/job/no_worker/NoWorkerJobMainService.js";

var registerNoWorkerInitJob = NoWorkerJobMainService$Wonderjs.registerNoWorkerInitJob;

var registerNoWorkerLoopJob = NoWorkerJobMainService$Wonderjs.registerNoWorkerLoopJob;

function addNoWorkerInitJob(param, action, targetHandleFunc, state) {
  return NoWorkerJobMainService$Wonderjs.addNoWorkerInitJob(/* tuple */[
              param[0],
              param[1]
            ], action, targetHandleFunc, state);
}

function addNoWorkerLoopJob(param, action, targetHandleFunc, state) {
  return NoWorkerJobMainService$Wonderjs.addNoWorkerLoopJob(/* tuple */[
              param[0],
              param[1]
            ], action, targetHandleFunc, state);
}

var removeNoWorkerInitJob = NoWorkerJobMainService$Wonderjs.removeNoWorkerInitJob;

var removeNoWorkerLoopJob = NoWorkerJobMainService$Wonderjs.removeNoWorkerLoopJob;

function addWorkerMainInitJob(param, action, targetHandleFunc, state) {
  return WorkerJobMainService$Wonderjs.addWorkerMainInitJob(/* tuple */[
              param[0],
              param[1]
            ], action, targetHandleFunc, state);
}

var removeWorkerMainInitJob = WorkerJobMainService$Wonderjs.removeWorkerMainInitJob;

function addWorkerMainLoopJob(param, action, targetHandleFunc, state) {
  return WorkerJobMainService$Wonderjs.addWorkerMainLoopJob(/* tuple */[
              param[0],
              param[1]
            ], action, targetHandleFunc, state);
}

var removeWorkerMainLoopJob = WorkerJobMainService$Wonderjs.removeWorkerMainLoopJob;

export {
  registerNoWorkerInitJob ,
  registerNoWorkerLoopJob ,
  addNoWorkerInitJob ,
  addNoWorkerLoopJob ,
  removeNoWorkerInitJob ,
  removeNoWorkerLoopJob ,
  addWorkerMainInitJob ,
  removeWorkerMainInitJob ,
  addWorkerMainLoopJob ,
  removeWorkerMainLoopJob ,
  
}
/* WorkerJobMainService-Wonderjs Not a pure module */
