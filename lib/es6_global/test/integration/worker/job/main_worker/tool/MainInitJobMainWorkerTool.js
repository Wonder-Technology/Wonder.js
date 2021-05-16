

import * as Most from "most";
import * as Curry from "../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as MainStateTool$Wonderjs from "../../../../../tool/service/state/MainStateTool.js";
import * as EventWorkerTool$Wonderjs from "../../../tool/EventWorkerTool.js";
import * as HandleJobService$Wonderjs from "../../../../../../src/service/primitive/job/HandleJobService.js";
import * as WorkerWorkerTool$Wonderjs from "../../../tool/WorkerWorkerTool.js";
import * as WorkerJobWorkerTool$Wonderjs from "../../../tool/WorkerJobWorkerTool.js";
import * as WorkerJobHandleSystem$Wonderjs from "../../../../../../src/job/worker/WorkerJobHandleSystem.js";

function prepare(param) {
  return WorkerWorkerTool$Wonderjs.setFakeWorkersAndSetState(MainStateTool$Wonderjs.unsafeGetState(/* () */0));
}

var createMainInitJobHandleMap = HandleJobService$Wonderjs.createJobHandleMap;

function testWithJobHandleMap(sandbox, jobHandleMap, getWorkerFunc, judgeFunc, state) {
  var worker = Curry._1(getWorkerFunc, state);
  var postMessageToWorker = WorkerWorkerTool$Wonderjs.stubPostMessage(sandbox, worker);
  return Most.forEach((function (data) {
                  if (data !== undefined) {
                    switch (data) {
                      case "INIT_RENDER" : 
                          Curry._3(EventWorkerTool$Wonderjs.triggerWorkerEvent, worker, "message", {
                                data: {
                                  operateType: "FINISH_INIT_RENDER"
                                }
                              });
                          return /* () */0;
                      case "SEND_JOB_DATA" : 
                          Curry._3(EventWorkerTool$Wonderjs.triggerWorkerEvent, worker, "message", {
                                data: {
                                  operateType: "FINISH_SEND_JOB_DATA"
                                }
                              });
                          return /* () */0;
                      default:
                        return /* () */0;
                    }
                  } else {
                    return /* () */0;
                  }
                }), WorkerJobWorkerTool$Wonderjs.getMainInitJobStream(MainStateTool$Wonderjs.getStateData(/* () */0), /* tuple */[
                    (function (param) {
                        return jobHandleMap;
                      }),
                    WorkerJobHandleSystem$Wonderjs.getMainInitJobHandle
                  ], MainStateTool$Wonderjs.unsafeGetState(/* () */0))).then((function (param) {
                return Promise.resolve(Curry._1(judgeFunc, postMessageToWorker));
              }));
}

function test(sandbox, getWorkerFunc, judgeFunc, state) {
  return testWithJobHandleMap(sandbox, WorkerJobHandleSystem$Wonderjs.createMainInitJobHandleMap(/* () */0), getWorkerFunc, judgeFunc, state);
}

export {
  prepare ,
  createMainInitJobHandleMap ,
  testWithJobHandleMap ,
  test ,
  
}
/* most Not a pure module */
