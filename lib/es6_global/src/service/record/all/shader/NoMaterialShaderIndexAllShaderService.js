

import * as OptionService$Wonderjs from "../../../atom/OptionService.js";
import * as MutableHashMapService$WonderCommonlib from "./../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableHashMapService.js";

function getShaderIndex(key, param) {
  var noMaterialShaderIndexMap = param[/* noMaterialShaderIndexMap */1];
  return MutableHashMapService$WonderCommonlib.get(key, noMaterialShaderIndexMap);
}

function unsafeGetShaderIndex(key, record) {
  return OptionService$Wonderjs.unsafeGet(getShaderIndex(key, record));
}

function setShaderIndex(key, shaderIndex, param) {
  var noMaterialShaderIndexMap = param[/* noMaterialShaderIndexMap */1];
  return MutableHashMapService$WonderCommonlib.set(key, shaderIndex, noMaterialShaderIndexMap);
}

export {
  getShaderIndex ,
  unsafeGetShaderIndex ,
  setShaderIndex ,
  
}
/* OptionService-Wonderjs Not a pure module */
