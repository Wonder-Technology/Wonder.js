

import * as OptionService$Wonderjs from "../../../../atom/OptionService.js";

function getRecord(param) {
  return OptionService$Wonderjs.unsafeGet(param[/* basicMaterialRecord */12]);
}

function unsafeGetShaderIndices(state) {
  return OptionService$Wonderjs.unsafeGet(getRecord(state)[/* shaderIndices */0]);
}

function unsafeGetMapUnits(state) {
  return OptionService$Wonderjs.unsafeGet(getRecord(state)[/* mapUnits */3]);
}

export {
  getRecord ,
  unsafeGetShaderIndices ,
  unsafeGetMapUnits ,
  
}
/* OptionService-Wonderjs Not a pure module */
