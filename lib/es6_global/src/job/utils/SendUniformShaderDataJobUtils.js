

import * as ProgramService$Wonderjs from "../../service/record/all/program/ProgramService.js";
import * as ArrayService$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as GLSLLocationService$Wonderjs from "../../service/record/all/location/GLSLLocationService.js";
import * as DeviceManagerService$Wonderjs from "../../service/record/all/device/DeviceManagerService.js";
import * as UseProgramRenderService$Wonderjs from "../../service/state/render/program/UseProgramRenderService.js";
import * as ShaderIndexRenderShaderService$Wonderjs from "../../service/record/render/shader/ShaderIndexRenderShaderService.js";
import * as HandleUniformShaderCachableService$Wonderjs from "../../service/record/render/sender/uniform/HandleUniformShaderCachableService.js";
import * as HandleUniformShaderNoCachableService$Wonderjs from "../../service/record/render/sender/uniform/HandleUniformShaderNoCachableService.js";
import * as HandleUniformShaderCachableFunctionService$Wonderjs from "../../service/record/render/sender/uniform/HandleUniformShaderCachableFunctionService.js";

function execJob(renderState) {
  var gl = DeviceManagerService$Wonderjs.unsafeGetGl(renderState[/* deviceManagerRecord */18]);
  return ArrayService$WonderCommonlib.reduceOneParam((function (renderState, shaderIndex) {
                var program = ProgramService$Wonderjs.unsafeGetProgram(shaderIndex, renderState[/* programRecord */4]);
                var renderState$1 = UseProgramRenderService$Wonderjs.use(gl, program, renderState);
                var renderState$2 = ArrayService$WonderCommonlib.reduceOneParam((function (renderState, param) {
                        var pos = param[/* pos */0];
                        var match = GLSLLocationService$Wonderjs.isUniformLocationExist(pos);
                        if (match) {
                          param[/* sendDataFunc */2](gl, pos, param[/* getDataFunc */1](renderState));
                        }
                        return renderState;
                      }), renderState$1, HandleUniformShaderNoCachableService$Wonderjs.unsafeGetUniformSendData(shaderIndex, renderState$1[/* glslSenderRecord */3]));
                var renderState$3 = ArrayService$WonderCommonlib.reduceOneParam((function (renderState, param) {
                        param[/* sendDataFunc */4](gl, param[/* shaderCacheMap */0], /* tuple */[
                              param[/* name */1],
                              param[/* pos */2]
                            ], param[/* getDataFunc */3](renderState));
                        return renderState;
                      }), renderState$2, HandleUniformShaderCachableService$Wonderjs.unsafeGetUniformSendData(shaderIndex, renderState$2[/* glslSenderRecord */3]));
                return ArrayService$WonderCommonlib.reduceOneParam((function (renderState, param) {
                              param[/* sendCachableFunctionDataFunc */3](gl, /* tuple */[
                                    param[/* program */0],
                                    param[/* shaderCacheMap */1],
                                    param[/* locationMap */2]
                                  ], renderState);
                              return renderState;
                            }), renderState$3, HandleUniformShaderCachableFunctionService$Wonderjs.unsafeGetUniformSendData(shaderIndex, renderState$3[/* glslSenderRecord */3]));
              }), renderState, ShaderIndexRenderShaderService$Wonderjs.getAllShaderIndexArray(renderState[/* shaderRecord */19]));
}

export {
  execJob ,
  
}
/* ProgramService-Wonderjs Not a pure module */
