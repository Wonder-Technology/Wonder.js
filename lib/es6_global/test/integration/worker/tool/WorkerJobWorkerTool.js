

import * as Most from "most";
import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Caml_option from "../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as MainStateTool$Wonderjs from "../../../tool/service/state/MainStateTool.js";
import * as WorkerJobMainService$Wonderjs from "../../../../src/service/state/main/job/worker/WorkerJobMainService.js";
import * as RenderWorkerStateTool$Wonderjs from "../../../tool/service/state/RenderWorkerStateTool.js";

function execMainWorkerJob(execJobFunc, completeFunc, $staropt$star, param) {
  var flag = $staropt$star !== undefined ? Caml_option.valFromOption($staropt$star) : /* array */[""];
  return Most.drain(Curry._2(execJobFunc, flag, MainStateTool$Wonderjs.getStateData(/* () */0))).then((function (param) {
                return Curry._1(completeFunc, MainStateTool$Wonderjs.unsafeGetState(/* () */0));
              }));
}

function execRenderWorkerJob(execJobFunc, completeFunc, $staropt$star, $staropt$star$1, param) {
  var e = $staropt$star !== undefined ? Caml_option.valFromOption($staropt$star) : ({
        data: 1
      });
  var flag = $staropt$star$1 !== undefined ? Caml_option.valFromOption($staropt$star$1) : /* array */[""];
  return Most.drain(Curry._3(execJobFunc, flag, e, RenderWorkerStateTool$Wonderjs.getStateData(/* () */0))).then((function (param) {
                return Curry._1(completeFunc, RenderWorkerStateTool$Wonderjs.unsafeGetState(/* () */0));
              }));
}

var getMainInitJobStream = WorkerJobMainService$Wonderjs.getMainInitJobStream;

var getMainLoopJobStream = WorkerJobMainService$Wonderjs.getMainLoopJobStream;

var getRenderWorkerJobStreamArr = WorkerJobMainService$Wonderjs.getRenderWorkerJobStreamArr;

export {
  getMainInitJobStream ,
  getMainLoopJobStream ,
  getRenderWorkerJobStreamArr ,
  execMainWorkerJob ,
  execRenderWorkerJob ,
  
}
/* most Not a pure module */
