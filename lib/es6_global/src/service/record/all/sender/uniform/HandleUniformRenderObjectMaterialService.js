

import * as ArrayService$Wonderjs from "../../../../atom/ArrayService.js";
import * as SendUniformService$Wonderjs from "../SendUniformService.js";
import * as SendGLSLDataService$Wonderjs from "../SendGLSLDataService.js";
import * as MutableSparseMapService$WonderCommonlib from "./../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";
import * as HandleUniformConfigDataMapService$Wonderjs from "../../../../primitive/sender/HandleUniformConfigDataMapService.js";

function addUniformSendDataByType(param, param$1, getDataFunc) {
  return /* record */[
          /* renderObjectSendModelDataArr */param$1[/* renderObjectSendModelDataArr */0],
          /* renderObjectSendMaterialDataArr */ArrayService$Wonderjs.push(/* record */[
                /* shaderCacheMap */param[0],
                /* name */param[1],
                /* pos */param[2],
                /* getDataFunc */getDataFunc,
                /* sendDataFunc */SendUniformService$Wonderjs.getSendCachableDataByType(param[3])
              ], param$1[/* renderObjectSendMaterialDataArr */1]),
          /* shaderSendNoCachableDataArr */param$1[/* shaderSendNoCachableDataArr */2],
          /* shaderSendCachableDataArr */param$1[/* shaderSendCachableDataArr */3],
          /* shaderSendCachableFunctionDataArr */param$1[/* shaderSendCachableFunctionDataArr */4],
          /* instanceSendNoCachableDataArr */param$1[/* instanceSendNoCachableDataArr */5],
          /* noMaterialShaderSendCachableDataArr */param$1[/* noMaterialShaderSendCachableDataArr */6]
        ];
}

function addUniformTextureSendDataByType(param, param$1, getDataFunc) {
  return /* record */[
          /* renderObjectSendModelDataArr */param$1[/* renderObjectSendModelDataArr */0],
          /* renderObjectSendMaterialDataArr */ArrayService$Wonderjs.push(/* record */[
                /* shaderCacheMap */param[0],
                /* name */param[1],
                /* pos */param[2],
                /* getDataFunc */getDataFunc,
                /* sendDataFunc */SendGLSLDataService$Wonderjs.sendInt
              ], param$1[/* renderObjectSendMaterialDataArr */1]),
          /* shaderSendNoCachableDataArr */param$1[/* shaderSendNoCachableDataArr */2],
          /* shaderSendCachableDataArr */param$1[/* shaderSendCachableDataArr */3],
          /* shaderSendCachableFunctionDataArr */param$1[/* shaderSendCachableFunctionDataArr */4],
          /* instanceSendNoCachableDataArr */param$1[/* instanceSendNoCachableDataArr */5],
          /* noMaterialShaderSendCachableDataArr */param$1[/* noMaterialShaderSendCachableDataArr */6]
        ];
}

function setToUniformSendMap(shaderIndex, uniformRenderObjectSendMaterialDataMap, renderObjectSendMaterialDataArr) {
  MutableSparseMapService$WonderCommonlib.set(shaderIndex, renderObjectSendMaterialDataArr, uniformRenderObjectSendMaterialDataMap);
  return /* () */0;
}

function unsafeGetUniformSendData(shaderIndex, glslSenderRecord) {
  return HandleUniformConfigDataMapService$Wonderjs.unsafeGetUniformSendData(shaderIndex, glslSenderRecord[/* uniformRenderObjectSendMaterialDataMap */4]);
}

export {
  addUniformSendDataByType ,
  addUniformTextureSendDataByType ,
  setToUniformSendMap ,
  unsafeGetUniformSendData ,
  
}
/* ArrayService-Wonderjs Not a pure module */
