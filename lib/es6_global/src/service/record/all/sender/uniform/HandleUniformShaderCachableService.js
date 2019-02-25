

import * as ArrayService$Wonderjs from "../../../../atom/ArrayService.js";
import * as SendUniformService$Wonderjs from "../SendUniformService.js";
import * as MutableSparseMapService$WonderCommonlib from "../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";

function addUniformSendDataByType(param, param$1, getDataFunc) {
  return /* record */[
          /* renderObjectSendModelDataArr */param$1[/* renderObjectSendModelDataArr */0],
          /* renderObjectSendMaterialDataArr */param$1[/* renderObjectSendMaterialDataArr */1],
          /* shaderSendNoCachableDataArr */param$1[/* shaderSendNoCachableDataArr */2],
          /* shaderSendCachableDataArr */ArrayService$Wonderjs.push(/* record */[
                /* shaderCacheMap */param[0],
                /* name */param[1],
                /* pos */param[2],
                /* getDataFunc */getDataFunc,
                /* sendDataFunc */SendUniformService$Wonderjs.getSendCachableDataByType(param[3])
              ], param$1[/* shaderSendCachableDataArr */3]),
          /* shaderSendCachableFunctionDataArr */param$1[/* shaderSendCachableFunctionDataArr */4],
          /* instanceSendNoCachableDataArr */param$1[/* instanceSendNoCachableDataArr */5],
          /* noMaterialShaderSendCachableDataArr */param$1[/* noMaterialShaderSendCachableDataArr */6]
        ];
}

function setToUniformSendMap(shaderIndex, uniformShaderSendCachableDataMap, shaderSendCachableDataArr) {
  return MutableSparseMapService$WonderCommonlib.set(shaderIndex, shaderSendCachableDataArr, uniformShaderSendCachableDataMap);
}

function reduceiValidShaderSendCachableData(glslSenderRecord, func, initValue) {
  return MutableSparseMapService$WonderCommonlib.reduceiValid(func, initValue, glslSenderRecord[/* uniformShaderSendCachableDataMap */6]);
}

function removeData(shaderIndex, glslSenderRecord) {
  var uniformShaderSendCachableDataMap = glslSenderRecord[/* uniformShaderSendCachableDataMap */6];
  var match = MutableSparseMapService$WonderCommonlib.has(shaderIndex, uniformShaderSendCachableDataMap);
  if (match) {
    MutableSparseMapService$WonderCommonlib.deleteVal(shaderIndex, uniformShaderSendCachableDataMap);
  }
  return glslSenderRecord;
}

export {
  addUniformSendDataByType ,
  setToUniformSendMap ,
  reduceiValidShaderSendCachableData ,
  removeData ,
  
}
/* ArrayService-Wonderjs Not a pure module */
