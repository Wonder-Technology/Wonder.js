

import * as Most from "most";
import * as Curry from "../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Log$WonderLog from "../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as WorkerService$Wonderjs from "../../service/primitive/worker/WorkerService.js";
import * as WorkerJobMainService$Wonderjs from "../../service/state/main/job/worker/WorkerJobMainService.js";
import * as StateDataRenderWorker$Wonderjs from "../../service/state/render_worker/data/StateDataRenderWorker.js";
import * as WorkerJobHandleSystem$Wonderjs from "../../job/worker/WorkerJobHandleSystem.js";
import * as StateRenderWorkerService$Wonderjs from "../../service/state/render_worker/state/StateRenderWorkerService.js";
import * as CreateStateRenderWorkerService$Wonderjs from "../../service/state/render_worker/state/CreateStateRenderWorkerService.js";

function onerrorHandler(msg, fileName, lineno) {
  return Log$WonderLog.error(Log$WonderLog.buildErrorMessage("render worker error", "" + (String(msg) + ""), "", "", "fileName:" + (String(fileName) + ("\n        lineno:" + (String(lineno) + "")))));
}

function _createAndSetWorkerState(param) {
  StateRenderWorkerService$Wonderjs.setState(StateDataRenderWorker$Wonderjs.renderWorkerStateData, CreateStateRenderWorkerService$Wonderjs.createState(/* () */0));
  return /* () */0;
}

Most.drain(Most.concatMap((function (e) {
            return Most.mergeArray((_createAndSetWorkerState(/* () */0), WorkerJobMainService$Wonderjs.getRenderWorkerJobStreamArr(JSON.parse(e.data.pipelineJobs), JSON.parse(e.data.jobs), /* tuple */[
                              WorkerJobHandleSystem$Wonderjs.createWorkerJobHandleMap,
                              WorkerJobHandleSystem$Wonderjs.getWorkerJobHandle
                            ], StateDataRenderWorker$Wonderjs.renderWorkerStateData)));
          }), Most.filter((function (e) {
                return e.data.operateType === "SEND_JOB_DATA";
              }), Most.fromEvent("message", Curry._1(WorkerService$Wonderjs.getSelf, /* () */0)))));

export {
  onerrorHandler ,
  _createAndSetWorkerState ,
  
}
/*  Not a pure module */
