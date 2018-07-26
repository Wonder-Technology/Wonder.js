'use strict';

var Most = require("most");
var Curry = require("bs-platform/lib/js/curry.js");
var Js_primitive = require("bs-platform/lib/js/js_primitive.js");
var MainStateTool$Wonderjs = require("../../../tool/service/state/MainStateTool.js");
var WorkerJobMainService$Wonderjs = require("../../../../src/service/state/main/job/worker/WorkerJobMainService.js");
var RenderWorkerStateTool$Wonderjs = require("../../../tool/service/state/RenderWorkerStateTool.js");

function execMainWorkerJob(execJobFunc, completeFunc, $staropt$star, _) {
  var flag = $staropt$star !== undefined ? Js_primitive.valFromOption($staropt$star) : /* array */[""];
  return Most.drain(Curry._2(execJobFunc, flag, MainStateTool$Wonderjs.getStateData(/* () */0))).then((function () {
                return Curry._1(completeFunc, MainStateTool$Wonderjs.unsafeGetState(/* () */0));
              }));
}

function execRenderWorkerJob(execJobFunc, completeFunc, $staropt$star, $staropt$star$1, _) {
  var e = $staropt$star !== undefined ? Js_primitive.valFromOption($staropt$star) : ({
        data: 1
      });
  var flag = $staropt$star$1 !== undefined ? Js_primitive.valFromOption($staropt$star$1) : /* array */[""];
  return Most.drain(Curry._3(execJobFunc, flag, e, RenderWorkerStateTool$Wonderjs.getStateData(/* () */0))).then((function () {
                return Curry._1(completeFunc, RenderWorkerStateTool$Wonderjs.unsafeGetState(/* () */0));
              }));
}

var getMainInitJobStream = WorkerJobMainService$Wonderjs.getMainInitJobStream;

var getMainLoopJobStream = WorkerJobMainService$Wonderjs.getMainLoopJobStream;

var getRenderWorkerJobStreamArr = WorkerJobMainService$Wonderjs.getRenderWorkerJobStreamArr;

exports.getMainInitJobStream = getMainInitJobStream;
exports.getMainLoopJobStream = getMainLoopJobStream;
exports.getRenderWorkerJobStreamArr = getRenderWorkerJobStreamArr;
exports.execMainWorkerJob = execMainWorkerJob;
exports.execRenderWorkerJob = execRenderWorkerJob;
/* most Not a pure module */
