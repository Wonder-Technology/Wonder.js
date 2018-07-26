'use strict';

var Most = require("most");
var Curry = require("bs-platform/lib/js/curry.js");
var MainStateTool$Wonderjs = require("../../../../../tool/service/state/MainStateTool.js");
var EventWorkerTool$Wonderjs = require("../../../tool/EventWorkerTool.js");
var WorkerWorkerTool$Wonderjs = require("../../../tool/WorkerWorkerTool.js");
var WorkerJobWorkerTool$Wonderjs = require("../../../tool/WorkerJobWorkerTool.js");
var WorkerJobHandleSystem$Wonderjs = require("../../../../../../src/job/worker/WorkerJobHandleSystem.js");

function prepare() {
  return WorkerWorkerTool$Wonderjs.setFakeWorkersAndSetState(MainStateTool$Wonderjs.unsafeGetState(/* () */0));
}

function test(sandbox, getWorkerFunc, judgeFunc, state) {
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
                    WorkerJobHandleSystem$Wonderjs.createMainInitJobHandleMap,
                    WorkerJobHandleSystem$Wonderjs.getMainInitJobHandle
                  ], MainStateTool$Wonderjs.unsafeGetState(/* () */0))).then((function () {
                return Promise.resolve(Curry._1(judgeFunc, postMessageToWorker));
              }));
}

exports.prepare = prepare;
exports.test = test;
/* most Not a pure module */
