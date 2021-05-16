

import * as ArrayService$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as AllGLSLLocationService$Wonderjs from "../../service/record/all/location/AllGLSLLocationService.js";
import * as AllDeviceManagerService$Wonderjs from "../../service/record/all/device/AllDeviceManagerService.js";
import * as UseProgramRenderService$Wonderjs from "../../service/state/render/program/UseProgramRenderService.js";
import * as OperateCameraRenderService$Wonderjs from "../../service/state/render/camera/OperateCameraRenderService.js";
import * as HandleUniformShaderCachableService$Wonderjs from "../../service/record/all/sender/uniform/HandleUniformShaderCachableService.js";
import * as HandleUniformShaderNoCachableService$Wonderjs from "../../service/record/all/sender/uniform/HandleUniformShaderNoCachableService.js";
import * as CreateGetRenederDataSubStateRenderService$Wonderjs from "../../service/state/render/sub/get_render_data/CreateGetRenederDataSubStateRenderService.js";
import * as CreateSendRenederDataSubStateRenderService$Wonderjs from "../../service/state/render/sub/send_render_data/CreateSendRenederDataSubStateRenderService.js";
import * as HandleUniformShaderCachableFunctionService$Wonderjs from "../../service/record/all/sender/uniform/HandleUniformShaderCachableFunctionService.js";

var _useProgram = UseProgramRenderService$Wonderjs.useByShaderIndex;

function _sendNoCachableData(gl, renderState) {
  return HandleUniformShaderNoCachableService$Wonderjs.reduceiValidShaderSendNoCachableData(renderState[/* glslSenderRecord */3], (function (renderState, dataArr, shaderIndex) {
                var renderState$1 = UseProgramRenderService$Wonderjs.useByShaderIndex(gl, shaderIndex, renderState);
                ArrayService$WonderCommonlib.reduceOneParam((function (getRenderDataSubState, param) {
                        var pos = param[/* pos */0];
                        var match = AllGLSLLocationService$Wonderjs.isUniformLocationExist(pos);
                        if (match) {
                          param[/* sendDataFunc */2](gl, pos, param[/* getDataFunc */1](getRenderDataSubState));
                        }
                        return getRenderDataSubState;
                      }), CreateGetRenederDataSubStateRenderService$Wonderjs.createState(renderState$1), dataArr);
                return renderState$1;
              }), renderState);
}

function _sendCachableData(gl, renderState) {
  return HandleUniformShaderCachableService$Wonderjs.reduceiValidShaderSendCachableData(renderState[/* glslSenderRecord */3], (function (renderState, dataArr, shaderIndex) {
                var renderState$1 = UseProgramRenderService$Wonderjs.useByShaderIndex(gl, shaderIndex, renderState);
                ArrayService$WonderCommonlib.reduceOneParam((function (getRenderDataSubState, param) {
                        param[/* sendDataFunc */4](gl, param[/* shaderCacheMap */0], /* tuple */[
                              param[/* name */1],
                              param[/* pos */2]
                            ], param[/* getDataFunc */3](getRenderDataSubState));
                        return getRenderDataSubState;
                      }), CreateGetRenederDataSubStateRenderService$Wonderjs.createState(renderState$1), dataArr);
                return renderState$1;
              }), renderState);
}

function _sendCachableFunctionData(gl, renderState) {
  return HandleUniformShaderCachableFunctionService$Wonderjs.reduceiValidShaderSendCachableFunctionData(renderState[/* glslSenderRecord */3], (function (renderState, dataArr, shaderIndex) {
                var renderState$1 = UseProgramRenderService$Wonderjs.useByShaderIndex(gl, shaderIndex, renderState);
                ArrayService$WonderCommonlib.reduceOneParam((function (sendRenderDataSubState, param) {
                        param[/* sendCachableFunctionDataFunc */3](gl, /* tuple */[
                              param[/* program */0],
                              param[/* shaderCacheMap */1],
                              param[/* locationMap */2]
                            ], sendRenderDataSubState);
                        return sendRenderDataSubState;
                      }), CreateSendRenederDataSubStateRenderService$Wonderjs.createState(renderState$1), dataArr);
                return renderState$1;
              }), renderState);
}

function execJob(renderState) {
  var match = !OperateCameraRenderService$Wonderjs.hasCameraRecord(renderState);
  if (match) {
    return renderState;
  } else {
    var gl = AllDeviceManagerService$Wonderjs.unsafeGetGl(renderState[/* deviceManagerRecord */20]);
    return _sendCachableFunctionData(gl, _sendCachableData(gl, _sendNoCachableData(gl, renderState)));
  }
}

export {
  _useProgram ,
  _sendNoCachableData ,
  _sendCachableData ,
  _sendCachableFunctionData ,
  execJob ,
  
}
/* AllDeviceManagerService-Wonderjs Not a pure module */
