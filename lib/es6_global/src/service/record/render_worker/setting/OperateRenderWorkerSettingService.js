

import * as OptionService$Wonderjs from "../../../atom/OptionService.js";

function unsafeGetGPU(param) {
  return OptionService$Wonderjs.unsafeGet(param[/* gpu */0]);
}

function unsafeGetMemory(param) {
  return OptionService$Wonderjs.unsafeGet(param[/* memory */7]);
}

export {
  unsafeGetGPU ,
  unsafeGetMemory ,
  
}
/* OptionService-Wonderjs Not a pure module */
