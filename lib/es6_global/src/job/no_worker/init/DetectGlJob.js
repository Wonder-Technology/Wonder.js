

import * as Caml_array from "./../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as AllGPUDetectService$Wonderjs from "../../../service/record/all/gpu/AllGPUDetectService.js";
import * as AllDeviceManagerService$Wonderjs from "../../../service/record/all/device/AllDeviceManagerService.js";

function execJob(param, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* gpuDetectRecord */5] = AllGPUDetectService$Wonderjs.detect(AllDeviceManagerService$Wonderjs.unsafeGetGl(state[/* deviceManagerRecord */9]), state[/* gpuDetectRecord */5]);
  return newrecord;
}

export {
  execJob ,
  
}
/* AllGPUDetectService-Wonderjs Not a pure module */
