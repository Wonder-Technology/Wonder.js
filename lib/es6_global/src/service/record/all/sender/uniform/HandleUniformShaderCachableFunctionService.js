

import * as ArrayService$Wonderjs from "../../../../atom/ArrayService.js";
import * as MutableSparseMapService$WonderCommonlib from "./../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";

function addUniformSendDataByType(param, param$1, sendDataFunc) {
  return /* record */[
          /* renderObjectSendModelDataArr */param$1[/* renderObjectSendModelDataArr */0],
          /* renderObjectSendMaterialDataArr */param$1[/* renderObjectSendMaterialDataArr */1],
          /* shaderSendNoCachableDataArr */param$1[/* shaderSendNoCachableDataArr */2],
          /* shaderSendCachableDataArr */param$1[/* shaderSendCachableDataArr */3],
          /* shaderSendCachableFunctionDataArr */ArrayService$Wonderjs.push(/* record */[
                /* program */param[0],
                /* shaderCacheMap */param[1],
                /* locationMap */param[2],
                /* sendCachableFunctionDataFunc */sendDataFunc
              ], param$1[/* shaderSendCachableFunctionDataArr */4]),
          /* instanceSendNoCachableDataArr */param$1[/* instanceSendNoCachableDataArr */5],
          /* noMaterialShaderSendCachableDataArr */param$1[/* noMaterialShaderSendCachableDataArr */6]
        ];
}

function setToUniformSendMap(shaderIndex, uniformShaderSendCachableFunctionDataMap, shaderSendCachableFunctionDataArr) {
  return MutableSparseMapService$WonderCommonlib.set(shaderIndex, shaderSendCachableFunctionDataArr, uniformShaderSendCachableFunctionDataMap);
}

function reduceiValidShaderSendCachableFunctionData(glslSenderRecord, func, initValue) {
  return MutableSparseMapService$WonderCommonlib.reduceiValid(func, initValue, glslSenderRecord[/* uniformShaderSendCachableFunctionDataMap */7]);
}

function removeData(shaderIndex, glslSenderRecord) {
  var uniformShaderSendCachableFunctionDataMap = glslSenderRecord[/* uniformShaderSendCachableFunctionDataMap */7];
  var match = MutableSparseMapService$WonderCommonlib.has(shaderIndex, uniformShaderSendCachableFunctionDataMap);
  if (match) {
    MutableSparseMapService$WonderCommonlib.deleteVal(shaderIndex, uniformShaderSendCachableFunctionDataMap);
  }
  return glslSenderRecord;
}

export {
  addUniformSendDataByType ,
  setToUniformSendMap ,
  reduceiValidShaderSendCachableFunctionData ,
  removeData ,
  
}
/* ArrayService-Wonderjs Not a pure module */
