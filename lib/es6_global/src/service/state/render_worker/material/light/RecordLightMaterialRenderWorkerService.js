

import * as OptionService$Wonderjs from "../../../../atom/OptionService.js";

function getRecord(param) {
  return OptionService$Wonderjs.unsafeGet(param[/* lightMaterialRecord */13]);
}

function unsafeGetShaderIndices(state) {
  return OptionService$Wonderjs.unsafeGet(getRecord(state)[/* shaderIndices */0]);
}

function unsafeGetDiffuseMapUnits(state) {
  return OptionService$Wonderjs.unsafeGet(getRecord(state)[/* diffuseMapUnits */5]);
}

function unsafeGetSpecularMapUnits(state) {
  return OptionService$Wonderjs.unsafeGet(getRecord(state)[/* specularMapUnits */6]);
}

export {
  getRecord ,
  unsafeGetShaderIndices ,
  unsafeGetDiffuseMapUnits ,
  unsafeGetSpecularMapUnits ,
  
}
/* OptionService-Wonderjs Not a pure module */
