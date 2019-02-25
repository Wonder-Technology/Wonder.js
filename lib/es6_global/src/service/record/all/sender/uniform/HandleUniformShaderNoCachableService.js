

import * as ArrayService$Wonderjs from "../../../../atom/ArrayService.js";
import * as SendUniformService$Wonderjs from "../SendUniformService.js";
import * as MutableSparseMapService$WonderCommonlib from "../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";

function addUniformSendDataByType(param, param$1, getDataFunc) {
  return /* record */[
          /* renderObjectSendModelDataArr */param$1[/* renderObjectSendModelDataArr */0],
          /* renderObjectSendMaterialDataArr */param$1[/* renderObjectSendMaterialDataArr */1],
          /* shaderSendNoCachableDataArr */ArrayService$Wonderjs.push(/* record */[
                /* pos */param[1],
                /* getDataFunc */getDataFunc,
                /* sendDataFunc */SendUniformService$Wonderjs.getSendNoCachableDataByType(param[0])
              ], param$1[/* shaderSendNoCachableDataArr */2]),
          /* shaderSendCachableDataArr */param$1[/* shaderSendCachableDataArr */3],
          /* shaderSendCachableFunctionDataArr */param$1[/* shaderSendCachableFunctionDataArr */4],
          /* instanceSendNoCachableDataArr */param$1[/* instanceSendNoCachableDataArr */5],
          /* noMaterialShaderSendCachableDataArr */param$1[/* noMaterialShaderSendCachableDataArr */6]
        ];
}

function setToUniformSendMap(shaderIndex, uniformShaderSendNoCachableDataMap, shaderSendNoCachableDataArr) {
  return MutableSparseMapService$WonderCommonlib.set(shaderIndex, shaderSendNoCachableDataArr, uniformShaderSendNoCachableDataMap);
}

function reduceiValidShaderSendNoCachableData(glslSenderRecord, func, initValue) {
  return MutableSparseMapService$WonderCommonlib.reduceiValid(func, initValue, glslSenderRecord[/* uniformShaderSendNoCachableDataMap */5]);
}

function removeData(shaderIndex, glslSenderRecord) {
  var uniformShaderSendNoCachableDataMap = glslSenderRecord[/* uniformShaderSendNoCachableDataMap */5];
  var match = MutableSparseMapService$WonderCommonlib.has(shaderIndex, uniformShaderSendNoCachableDataMap);
  if (match) {
    MutableSparseMapService$WonderCommonlib.deleteVal(shaderIndex, uniformShaderSendNoCachableDataMap);
  }
  return glslSenderRecord;
}

export {
  addUniformSendDataByType ,
  setToUniformSendMap ,
  reduceiValidShaderSendNoCachableData ,
  removeData ,
  
}
/* ArrayService-Wonderjs Not a pure module */
