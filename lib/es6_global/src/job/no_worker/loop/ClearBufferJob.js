

import * as Caml_array from "../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as JobConfigService$Wonderjs from "../../../service/primitive/JobConfigService.js";
import * as ClearBufferJobUtils$Wonderjs from "../../utils/ClearBufferJobUtils.js";
import * as DeviceManagerService$Wonderjs from "../../../service/record/all/device/DeviceManagerService.js";

function execJob(flags, state) {
  var gl = DeviceManagerService$Wonderjs.unsafeGetGl(state[/* deviceManagerRecord */9]);
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* deviceManagerRecord */9] = DeviceManagerService$Wonderjs.clearBuffer(gl, ClearBufferJobUtils$Wonderjs.getBit(gl, JobConfigService$Wonderjs.unsafeGetFlags(flags)), state[/* deviceManagerRecord */9]);
  return newrecord;
}

export {
  execJob ,
  
}
/* JobConfigService-Wonderjs Not a pure module */
