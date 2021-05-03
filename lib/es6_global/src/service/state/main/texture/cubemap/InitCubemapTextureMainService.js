

import * as Caml_array from "./../../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as ArrayService$Wonderjs from "../../../../atom/ArrayService.js";
import * as InitTextureService$Wonderjs from "../../../../primitive/texture/InitTextureService.js";
import * as AllDeviceManagerService$Wonderjs from "../../../../record/all/device/AllDeviceManagerService.js";
import * as WorkerDetectMainService$Wonderjs from "../../workerDetect/WorkerDetectMainService.js";
import * as RecordCubemapTextureMainService$Wonderjs from "./RecordCubemapTextureMainService.js";

function _handleInitTextureWorker(texture, state) {
  ArrayService$Wonderjs.push(texture, RecordCubemapTextureMainService$Wonderjs.getRecord(state)[/* needInitedTextureIndexArray */34]);
  return state;
}

function _handleInitTextureNoWorker(texture, state) {
  InitTextureService$Wonderjs.initTexture(AllDeviceManagerService$Wonderjs.unsafeGetGl(state[/* deviceManagerRecord */9]), texture, RecordCubemapTextureMainService$Wonderjs.getRecord(state)[/* glTextureMap */26]);
  return state;
}

function initTexture(texture, state) {
  var match = WorkerDetectMainService$Wonderjs.isUseWorker(state);
  if (match) {
    return _handleInitTextureWorker(texture, state);
  } else {
    return _handleInitTextureNoWorker(texture, state);
  }
}

function clearNeedInitedTextureIndexArray(state) {
  var newrecord = Caml_array.caml_array_dup(state);
  var newrecord$1 = Caml_array.caml_array_dup(RecordCubemapTextureMainService$Wonderjs.getRecord(state));
  newrecord[/* cubemapTextureRecord */20] = (newrecord$1[/* needInitedTextureIndexArray */34] = /* array */[], newrecord$1);
  return newrecord;
}

export {
  _handleInitTextureWorker ,
  _handleInitTextureNoWorker ,
  initTexture ,
  clearNeedInitedTextureIndexArray ,
  
}
/* ArrayService-Wonderjs Not a pure module */
