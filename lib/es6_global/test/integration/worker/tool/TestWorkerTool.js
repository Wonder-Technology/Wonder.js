

import * as Curry from "./../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "./../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Caml_array from "./../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as OptionService$Wonderjs from "../../../../src/service/atom/OptionService.js";
import * as RenderWorkerStateTool$Wonderjs from "../../../tool/service/state/RenderWorkerStateTool.js";

function clear(sandbox) {
  Curry._1(Sinon.restoreSandbox, sandbox[0]);
  RenderWorkerStateTool$Wonderjs.getStateData(/* () */0)[/* state */0] = undefined;
  return /* () */0;
}

function _markWorker(useWorker, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  var init = state[/* settingRecord */0];
  newrecord[/* settingRecord */0] = /* record */[
    /* canvasId */init[/* canvasId */0],
    /* memory */init[/* memory */1],
    /* buffer */init[/* buffer */2],
    /* isDebug */init[/* isDebug */3],
    /* context */init[/* context */4],
    /* gpu */init[/* gpu */5],
    /* worker */(OptionService$Wonderjs.unsafeGet(state[/* settingRecord */0][/* worker */6]), /* record */[/* useWorker */useWorker])
  ];
  var init$1 = state[/* workerDetectRecord */41];
  newrecord[/* workerDetectRecord */41] = /* record */[
    /* isSupportSharedArrayBuffer */init$1[/* isSupportSharedArrayBuffer */0],
    /* isSupportRenderWorkerAndSharedArrayBuffer */useWorker
  ];
  return newrecord;
}

function markUseWorker(state) {
  return _markWorker(true, state);
}

function markNotUseWorker(state) {
  return _markWorker(false, state);
}

export {
  clear ,
  _markWorker ,
  markUseWorker ,
  markNotUseWorker ,
  
}
/* Sinon Not a pure module */
