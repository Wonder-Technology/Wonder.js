

import * as OptionService$Wonderjs from "../../../atom/OptionService.js";

function getMaxTextureUnit(state) {
  return state[/* gpuDetectRecord */3][/* maxTextureUnit */3];
}

function unsafeGetMaxTextureUnit(state) {
  return OptionService$Wonderjs.unsafeGet(state[/* gpuDetectRecord */3][/* maxTextureUnit */3]);
}

export {
  getMaxTextureUnit ,
  unsafeGetMaxTextureUnit ,
  
}
/* OptionService-Wonderjs Not a pure module */
