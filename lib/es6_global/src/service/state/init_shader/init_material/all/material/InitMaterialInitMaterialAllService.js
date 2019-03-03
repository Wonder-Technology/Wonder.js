

import * as Curry from "../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Log$WonderLog from "../../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "../../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as ArrayService$Wonderjs from "../../../../../atom/ArrayService.js";
import * as StateDataMain$Wonderjs from "../../../../main/data/StateDataMain.js";
import * as IsDebugMainService$Wonderjs from "../../../../main/state/IsDebugMainService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as JudgeInstanceService$Wonderjs from "../../../../../record/all/instance/JudgeInstanceService.js";
import * as DisposeMaterialService$Wonderjs from "../../../../../record/main/material/DisposeMaterialService.js";
import * as GetDataRenderConfigService$Wonderjs from "../../../../../record/all/renderConfig/GetDataRenderConfigService.js";

function _initMaterialShader(gl, param, param$1, param$2) {
  var state = param$2[2];
  var renderConfigRecord = param$2[1];
  var materialIndex = param[0];
  var shaders = GetDataRenderConfigService$Wonderjs.getShaders(renderConfigRecord);
  param$1[2](materialIndex, Curry._4(param$1[0], materialIndex, /* tuple */[
            gl,
            param$1[4](materialIndex, /* tuple */[
                  param[1],
                  param[2]
                ], /* tuple */[
                  shaders,
                  Curry._1(param$1[3], shaders),
                  GetDataRenderConfigService$Wonderjs.getShaderLibs(renderConfigRecord)
                ], state)
          ], param$1[1], state), param$2[0]);
  return state;
}

var initMaterial = _initMaterialShader;

function reInitMaterial(gl, param, param$1, param$2) {
  var state = param$2[2];
  var renderConfigRecord = param$2[1];
  var materialIndex = param[0];
  var shaders = GetDataRenderConfigService$Wonderjs.getShaders(renderConfigRecord);
  param$1[2](materialIndex, Curry._4(param$1[0], materialIndex, /* tuple */[
            gl,
            param$1[4](materialIndex, /* tuple */[
                  param[1],
                  param[2]
                ], /* tuple */[
                  shaders,
                  Curry._1(param$1[3], shaders),
                  GetDataRenderConfigService$Wonderjs.getShaderLibs(renderConfigRecord)
                ], state)
          ], param$1[1], state), param$2[0]);
  return state;
}

function init(gl, param, initMaterialFunc, param$1) {
  var disposedIndexArray = param$1[1];
  var isSupportInstance = param[1];
  var isSourceInstanceMap = param[0];
  Contract$WonderLog.requireCheck((function (param) {
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("not dispose any material before init", "do"), (function (param) {
                        return Contract$WonderLog.assertTrue(DisposeMaterialService$Wonderjs.isNotDisposed(disposedIndexArray));
                      }));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return ArrayService$WonderCommonlib.reduceOneParam((function (state, materialIndex) {
                return initMaterialFunc(gl, /* tuple */[
                            materialIndex,
                            JudgeInstanceService$Wonderjs.unsafeGetIsSourceInstance(materialIndex, isSourceInstanceMap),
                            isSupportInstance
                          ], state);
              }), param$1[2], ArrayService$Wonderjs.range(0, param$1[0] - 1 | 0));
}

export {
  _initMaterialShader ,
  initMaterial ,
  reInitMaterial ,
  init ,
  
}
/* Log-WonderLog Not a pure module */
