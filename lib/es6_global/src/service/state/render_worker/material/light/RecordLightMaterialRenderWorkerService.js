

import * as OptionService$Wonderjs from "../../../../atom/OptionService.js";

function getRecord(param) {
  return OptionService$Wonderjs.unsafeGet(param[/* lightMaterialRecord */13]);
}

function unsafeGetShaderIndices(state) {
  return OptionService$Wonderjs.unsafeGet(getRecord(state)[/* shaderIndices */0]);
}

function unsafeGetDiffuseTextureIndices(state) {
  return OptionService$Wonderjs.unsafeGet(getRecord(state)[/* diffuseTextureIndices */4]);
}

function unsafeGetSpecularTextureIndices(state) {
  return OptionService$Wonderjs.unsafeGet(getRecord(state)[/* specularTextureIndices */5]);
}

export {
  getRecord ,
  unsafeGetShaderIndices ,
  unsafeGetDiffuseTextureIndices ,
  unsafeGetSpecularTextureIndices ,
  
}
/* OptionService-Wonderjs Not a pure module */
