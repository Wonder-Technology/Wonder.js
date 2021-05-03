

import * as ArrayService$Wonderjs from "../../../../atom/ArrayService.js";
import * as MutableSparseMapService$WonderCommonlib from "./../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";
import * as HandleUniformConfigDataMapService$Wonderjs from "../../../../primitive/sender/HandleUniformConfigDataMapService.js";

function addUniformSendDataByType(pos, param, param$1) {
  return /* record */[
          /* renderObjectSendModelDataArr */param[/* renderObjectSendModelDataArr */0],
          /* renderObjectSendMaterialDataArr */param[/* renderObjectSendMaterialDataArr */1],
          /* shaderSendNoCachableDataArr */param[/* shaderSendNoCachableDataArr */2],
          /* shaderSendCachableDataArr */param[/* shaderSendCachableDataArr */3],
          /* shaderSendCachableFunctionDataArr */param[/* shaderSendCachableFunctionDataArr */4],
          /* instanceSendNoCachableDataArr */ArrayService$Wonderjs.push(/* record */[
                /* pos */pos,
                /* getDataFunc */param$1[0],
                /* sendDataFunc */param$1[1]
              ], param[/* instanceSendNoCachableDataArr */5]),
          /* noMaterialShaderSendCachableDataArr */param[/* noMaterialShaderSendCachableDataArr */6]
        ];
}

function setToUniformSendMap(shaderIndex, uniformInstanceSendNoCachableDataMap, instanceSendNoCachableDataArr) {
  MutableSparseMapService$WonderCommonlib.set(shaderIndex, instanceSendNoCachableDataArr, uniformInstanceSendNoCachableDataMap);
  return /* () */0;
}

function unsafeGetUniformSendData(shaderIndex, glslSenderRecord) {
  return HandleUniformConfigDataMapService$Wonderjs.unsafeGetUniformSendData(shaderIndex, glslSenderRecord[/* uniformInstanceSendNoCachableDataMap */8]);
}

export {
  addUniformSendDataByType ,
  setToUniformSendMap ,
  unsafeGetUniformSendData ,
  
}
/* ArrayService-Wonderjs Not a pure module */
