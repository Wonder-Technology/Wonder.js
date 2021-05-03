

import * as ArrayService$Wonderjs from "../../../../atom/ArrayService.js";
import * as SendUniformService$Wonderjs from "../SendUniformService.js";
import * as MutableSparseMapService$WonderCommonlib from "./../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";
import * as HandleUniformConfigDataMapService$Wonderjs from "../../../../primitive/sender/HandleUniformConfigDataMapService.js";

function addUniformSendDataByType(param, param$1, getDataFunc) {
  return /* record */[
          /* renderObjectSendModelDataArr */ArrayService$Wonderjs.push(/* record */[
                /* pos */param[0],
                /* getDataFunc */getDataFunc,
                /* sendDataFunc */SendUniformService$Wonderjs.getSendNoCachableDataByType(param[1])
              ], param$1[/* renderObjectSendModelDataArr */0]),
          /* renderObjectSendMaterialDataArr */param$1[/* renderObjectSendMaterialDataArr */1],
          /* shaderSendNoCachableDataArr */param$1[/* shaderSendNoCachableDataArr */2],
          /* shaderSendCachableDataArr */param$1[/* shaderSendCachableDataArr */3],
          /* shaderSendCachableFunctionDataArr */param$1[/* shaderSendCachableFunctionDataArr */4],
          /* instanceSendNoCachableDataArr */param$1[/* instanceSendNoCachableDataArr */5],
          /* noMaterialShaderSendCachableDataArr */param$1[/* noMaterialShaderSendCachableDataArr */6]
        ];
}

function setToUniformSendMap(shaderIndex, uniformRenderObjectSendModelDataMap, renderObjectSendModelDataArr) {
  MutableSparseMapService$WonderCommonlib.set(shaderIndex, renderObjectSendModelDataArr, uniformRenderObjectSendModelDataMap);
  return /* () */0;
}

function unsafeGetUniformSendData(shaderIndex, param) {
  return HandleUniformConfigDataMapService$Wonderjs.unsafeGetUniformSendData(shaderIndex, param[/* uniformRenderObjectSendModelDataMap */3]);
}

export {
  addUniformSendDataByType ,
  setToUniformSendMap ,
  unsafeGetUniformSendData ,
  
}
/* ArrayService-Wonderjs Not a pure module */
