

import * as OptionService$Wonderjs from "../../../atom/OptionService.js";

function unsafeGetGPU(param) {
  return OptionService$Wonderjs.unsafeGet(param[/* gpu */0]);
}

function unsafeGetObjectInstanceCountPerSourceInstance(param) {
  return OptionService$Wonderjs.unsafeGet(param[/* instanceBuffer */1])[/* objectInstanceCountPerSourceInstance */0];
}

export {
  unsafeGetGPU ,
  unsafeGetObjectInstanceCountPerSourceInstance ,
  
}
/* OptionService-Wonderjs Not a pure module */
