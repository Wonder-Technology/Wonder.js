

import * as Curry from "./../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Caml_array from "./../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Worker$Wonderjs from "../../../../external/Worker.js";
import * as DomService$Wonderjs from "../../../primitive/DomService.js";
import * as DetectService$Wonderjs from "../../../primitive/DetectService.js";
import * as OperateSettingService$Wonderjs from "../../../record/main/setting/OperateSettingService.js";

function detect(state) {
  var isSupportSharedArrayBuffer = Worker$Wonderjs.isSupportSharedArrayBuffer(/* () */0);
  var newrecord = Caml_array.caml_array_dup(state);
  var match = !isSupportSharedArrayBuffer;
  newrecord[/* workerDetectRecord */41] = /* record */[
    /* isSupportSharedArrayBuffer */isSupportSharedArrayBuffer,
    /* isSupportRenderWorkerAndSharedArrayBuffer */match ? false : Curry._2(DetectService$Wonderjs.hasProperty, "transferControlToOffscreen", DomService$Wonderjs.buildCanvas())
  ];
  return newrecord;
}

function isSupportSharedArrayBuffer(state) {
  return state[/* workerDetectRecord */41][/* isSupportSharedArrayBuffer */0];
}

function isSupportRenderWorkerAndSharedArrayBuffer(state) {
  return state[/* workerDetectRecord */41][/* isSupportRenderWorkerAndSharedArrayBuffer */1];
}

function isUseWorker(state) {
  if (OperateSettingService$Wonderjs.unsafeGetWorker(state[/* settingRecord */0])[/* useWorker */0]) {
    return state[/* workerDetectRecord */41][/* isSupportRenderWorkerAndSharedArrayBuffer */1];
  } else {
    return false;
  }
}

export {
  detect ,
  isSupportSharedArrayBuffer ,
  isSupportRenderWorkerAndSharedArrayBuffer ,
  isUseWorker ,
  
}
/* Worker-Wonderjs Not a pure module */
