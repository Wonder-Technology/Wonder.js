

import * as ArrayService$Wonderjs from "../../../../atom/ArrayService.js";
import * as SendUniformService$Wonderjs from "../SendUniformService.js";
import * as SendGLSLDataService$Wonderjs from "../SendGLSLDataService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";
import * as HandleUniformConfigDataMapService$Wonderjs from "../../../../primitive/sender/HandleUniformConfigDataMapService.js";

function addUniformSendDataByType(param, param$1, getDataFunc) {
  return /* tuple */[
          param$1[0],
          ArrayService$Wonderjs.push(/* record */[
                /* shaderCacheMap */param[0],
                /* name */param[1],
                /* pos */param[2],
                /* getDataFunc */getDataFunc,
                /* sendDataFunc */SendUniformService$Wonderjs.getSendCachableDataByType(param[3])
              ], param$1[1]),
          param$1[2],
          param$1[3],
          param$1[4],
          param$1[5]
        ];
}

function addUniformTextureSendDataByType(param, param$1, getDataFunc) {
  return /* tuple */[
          param$1[0],
          ArrayService$Wonderjs.push(/* record */[
                /* shaderCacheMap */param[0],
                /* name */param[1],
                /* pos */param[2],
                /* getDataFunc */getDataFunc,
                /* sendDataFunc */SendGLSLDataService$Wonderjs.sendInt
              ], param$1[1]),
          param$1[2],
          param$1[3],
          param$1[4],
          param$1[5]
        ];
}

function setToUniformSendMap(shaderIndex, uniformRenderObjectSendMaterialDataMap, renderObjectSendMaterialDataArr) {
  SparseMapService$WonderCommonlib.set(shaderIndex, renderObjectSendMaterialDataArr, uniformRenderObjectSendMaterialDataMap);
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
