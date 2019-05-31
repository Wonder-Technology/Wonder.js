

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Log$WonderLog from "../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as DeviceManagerService$Wonderjs from "../../../record/all/device/DeviceManagerService.js";
import * as ShaderIndicesService$Wonderjs from "../../../primitive/material/ShaderIndicesService.js";
import * as ClearShaderMainService$Wonderjs from "../shader/ClearShaderMainService.js";
import * as WorkerDetectMainService$Wonderjs from "../workerDetect/WorkerDetectMainService.js";
import * as JudgeInstanceMainService$Wonderjs from "../instance/JudgeInstanceMainService.js";
import * as ShaderIndexShaderService$Wonderjs from "../../../record/all/shader/ShaderIndexShaderService.js";
import * as MaterialArrayForWorkerInitService$Wonderjs from "../../../primitive/material/MaterialArrayForWorkerInitService.js";

function initMaterials(materialIndexArr, param, param$1, state) {
  var initMaterialFunc = param$1[0];
  var gameObjectsMap = param[3];
  var gl = param[0];
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var isSupportInstance = JudgeInstanceMainService$Wonderjs.isSupportInstance(state);
  ArrayService$WonderCommonlib.reduceOneParam((function (state, materialIndex) {
          return initMaterialFunc(gl, /* tuple */[
                      materialIndex,
                      JudgeInstanceMainService$Wonderjs.isSourceInstance(materialIndex, gameObjectsMap, gameObjectRecord),
                      isSupportInstance
                    ], state);
        }), Curry._2(param$1[1], /* tuple */[
            param[1],
            param[2]
          ], state), materialIndexArr);
  return state;
}

function handleInitComponent(materialIndex, param, param$1, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var match = Curry._2(param$1[0], materialIndex, param[2]);
  if (match) {
    var match$1 = WorkerDetectMainService$Wonderjs.isUseWorker(state);
    if (match$1) {
      MaterialArrayForWorkerInitService$Wonderjs.addMaterialToMaterialArrayForWorkerInit(materialIndex, param[3]);
      return state;
    } else {
      var gl = DeviceManagerService$Wonderjs.unsafeGetGl(state[/* deviceManagerRecord */9]);
      var isSupportInstance = JudgeInstanceMainService$Wonderjs.isSupportInstance(state);
      param$1[1](gl, /* tuple */[
            materialIndex,
            JudgeInstanceMainService$Wonderjs.isSourceInstance(materialIndex, param[4], gameObjectRecord),
            isSupportInstance
          ], Curry._2(param$1[2], /* tuple */[
                param[0],
                param[1]
              ], state));
      return state;
    }
  } else {
    return state;
  }
}

function _reInitComponentsIfNoWorker(materialIndex, param, param$1, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var gl = DeviceManagerService$Wonderjs.unsafeGetGl(state[/* deviceManagerRecord */9]);
  var isSupportInstance = JudgeInstanceMainService$Wonderjs.isSupportInstance(state);
  param$1[0](gl, /* tuple */[
        materialIndex,
        JudgeInstanceMainService$Wonderjs.isSourceInstance(materialIndex, param[0], gameObjectRecord),
        isSupportInstance
      ], Curry._2(param$1[1], /* tuple */[
            param[1],
            param[2]
          ], state));
  return state;
}

function reInitComponents(materialIndices, param, param$1, state) {
  var createInitMaterialStateFunc = param$1[1];
  var reInitMaterialFunc = param$1[0];
  var disposedIndexArray = param[3];
  var index = param[2];
  var gameObjectsMap = param[1];
  var shaderIndices = param[0];
  var state$1 = ClearShaderMainService$Wonderjs.clearInitShaderCache(state);
  return ArrayService$WonderCommonlib.reduceOneParam((function (state, materialIndex) {
                var currentShaderIndex = ShaderIndicesService$Wonderjs.getShaderIndex(materialIndex, shaderIndices);
                var match = ShaderIndexShaderService$Wonderjs.isDefaultShaderIndex(currentShaderIndex);
                if (!match) {
                  ShaderIndexShaderService$Wonderjs.removeShaderIndexFromMaterial(currentShaderIndex, materialIndex, state[/* shaderRecord */26], state[/* glslSenderRecord */30]);
                }
                var match$1 = WorkerDetectMainService$Wonderjs.isUseWorker(state);
                if (match$1) {
                  return Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("reInitComponents", "not support worker", "", "", ""));
                } else {
                  return _reInitComponentsIfNoWorker(materialIndex, /* tuple */[
                              gameObjectsMap,
                              index,
                              disposedIndexArray
                            ], /* tuple */[
                              reInitMaterialFunc,
                              createInitMaterialStateFunc
                            ], state);
                }
              }), state$1, ArrayService$WonderCommonlib.removeDuplicateItems(materialIndices));
}

export {
  initMaterials ,
  handleInitComponent ,
  _reInitComponentsIfNoWorker ,
  reInitComponents ,
  
}
/* Log-WonderLog Not a pure module */
