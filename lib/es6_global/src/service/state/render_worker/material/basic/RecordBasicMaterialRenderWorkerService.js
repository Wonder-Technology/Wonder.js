

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

function unsafeGetIsDepthTests(state) {
  return OptionService$Wonderjs.unsafeGet(getRecord(state)[/* isDepthTests */4]);
}

function unsafeGetAlphas(state) {
  return OptionService$Wonderjs.unsafeGet(getRecord(state)[/* alphas */5]);
}

export {
  getRecord ,
  unsafeGetShaderIndices ,
  unsafeGetMapUnits ,
  unsafeGetIsDepthTests ,
  unsafeGetAlphas ,
  
}
/* OptionService-Wonderjs Not a pure module */
