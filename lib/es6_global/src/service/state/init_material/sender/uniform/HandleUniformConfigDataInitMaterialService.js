

import * as Log$WonderLog from "../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as OptionService$Wonderjs from "../../../../atom/OptionService.js";
import * as StateDataMain$Wonderjs from "../../../main/data/StateDataMain.js";
import * as IsDebugMainService$Wonderjs from "../../../main/state/IsDebugMainService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as GLSLLocationService$Wonderjs from "../../../../record/all/location/GLSLLocationService.js";
import * as SendGLSLDataService$Wonderjs from "../../../../record/render/sender/SendGLSLDataService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";
import * as HandleShaderConfigDataMapService$Wonderjs from "../../../../primitive/sender/HandleShaderConfigDataMapService.js";
import * as HandleUniformShaderCachableService$Wonderjs from "../../../../record/render/sender/uniform/HandleUniformShaderCachableService.js";
import * as HandleUniformShaderNoCachableService$Wonderjs from "../../../../record/render/sender/uniform/HandleUniformShaderNoCachableService.js";
import * as HandleUniformRenderObjectModelService$Wonderjs from "../../../../record/render/sender/uniform/HandleUniformRenderObjectModelService.js";
import * as HandleUniformInstanceNoCachableService$Wonderjs from "../../../../record/render/sender/uniform/HandleUniformInstanceNoCachableService.js";
import * as HandleUniformRenderObjectMaterialService$Wonderjs from "../../../../record/render/sender/uniform/HandleUniformRenderObjectMaterialService.js";
import * as HandleUniformShaderCachableFunctionService$Wonderjs from "../../../../record/render/sender/uniform/HandleUniformShaderCachableFunctionService.js";

function _setToUniformSendMap(shaderIndex, param, param$1) {
  HandleUniformRenderObjectModelService$Wonderjs.setToUniformSendMap(shaderIndex, param[/* uniformRenderObjectSendModelDataMap */3], param$1[0]);
  HandleUniformRenderObjectMaterialService$Wonderjs.setToUniformSendMap(shaderIndex, param[/* uniformRenderObjectSendMaterialDataMap */4], param$1[1]);
  HandleUniformShaderNoCachableService$Wonderjs.setToUniformSendMap(shaderIndex, param[/* uniformShaderSendNoCachableDataMap */5], param$1[2]);
  HandleUniformShaderCachableService$Wonderjs.setToUniformSendMap(shaderIndex, param[/* uniformShaderSendCachableDataMap */6], param$1[3]);
  HandleUniformShaderCachableFunctionService$Wonderjs.setToUniformSendMap(shaderIndex, param[/* uniformShaderSendCachableFunctionDataMap */7], param$1[4]);
  HandleUniformInstanceNoCachableService$Wonderjs.setToUniformSendMap(shaderIndex, param[/* uniformInstanceSendNoCachableDataMap */8], param$1[5]);
  return /* () */0;
}

function readUniformSendData(shaderLibDataArr, param, readUniformsFunc, param$1) {
  var uniformCacheMap = param$1[1];
  var uniformLocationMap = param$1[0];
  var program = param[1];
  var gl = param[0];
  return ArrayService$WonderCommonlib.reduceOneParam((function (sendDataArrTuple, param) {
                var variables = param[/* variables */2];
                var match = OptionService$Wonderjs.isJsonSerializedValueNone(variables);
                if (match) {
                  return sendDataArrTuple;
                } else {
                  var match$1 = OptionService$Wonderjs.unsafeGetJsonSerializedValue(variables);
                  return readUniformsFunc(/* tuple */[
                              gl,
                              program,
                              uniformLocationMap,
                              uniformCacheMap
                            ], sendDataArrTuple, match$1[/* uniforms */0]);
                }
              }), /* tuple */[
              /* array */[],
              /* array */[],
              /* array */[],
              /* array */[],
              /* array */[],
              /* array */[]
            ], shaderLibDataArr);
}

function _checkShouldNotAddBefore(shaderIndex, glslSenderRecord) {
  return Contract$WonderLog.requireCheck((function () {
                return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("not be added before", "be"), (function () {
                              return Contract$WonderLog.assertNotExist(SparseMapService$WonderCommonlib.get(shaderIndex, glslSenderRecord[/* uniformRenderObjectSendModelDataMap */3]));
                            }));
              }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
}

function addUniformSendData(gl, param, readUniformSendDataFunc, param$1) {
  var glslLocationRecord = param$1[1];
  var glslSenderRecord = param$1[0];
  var shaderIndex = param[1];
  var uniformLocationMap = HandleShaderConfigDataMapService$Wonderjs.getOrCreateHashMap(GLSLLocationService$Wonderjs.getUniformLocationMap(shaderIndex, glslLocationRecord));
  return /* tuple */[
          _setToUniformSendMap(shaderIndex, glslSenderRecord, readUniformSendDataFunc(param[2], gl, param[0], /* tuple */[
                    uniformLocationMap,
                    HandleShaderConfigDataMapService$Wonderjs.getOrCreateHashMap(SendGLSLDataService$Wonderjs.getCacheMap(shaderIndex, glslSenderRecord[/* uniformCacheMap */2]))
                  ])),
          GLSLLocationService$Wonderjs.setUniformLocationMap(shaderIndex, uniformLocationMap, glslLocationRecord)
        ];
}

export {
  _setToUniformSendMap ,
  readUniformSendData ,
  _checkShouldNotAddBefore ,
  addUniformSendData ,
  
}
/* Log-WonderLog Not a pure module */
