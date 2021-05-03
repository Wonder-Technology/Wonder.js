

import * as MutableHashMapService$WonderCommonlib from "./../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableHashMapService.js";

function getShaderIndex(key, param) {
  var shaderLibShaderIndexMap = param[/* shaderLibShaderIndexMap */2];
  return MutableHashMapService$WonderCommonlib.get(key, shaderLibShaderIndexMap);
}

function setShaderIndex(key, shaderIndex, param) {
  var shaderLibShaderIndexMap = param[/* shaderLibShaderIndexMap */2];
  return MutableHashMapService$WonderCommonlib.set(key, shaderIndex, shaderLibShaderIndexMap);
}

function clearShaderIndexMap(shaderRecord) {
  shaderRecord[/* shaderLibShaderIndexMap */2] = MutableHashMapService$WonderCommonlib.createEmpty(/* () */0);
  return shaderRecord;
}

export {
  getShaderIndex ,
  setShaderIndex ,
  clearShaderIndexMap ,
  
}
/* No side effect */
