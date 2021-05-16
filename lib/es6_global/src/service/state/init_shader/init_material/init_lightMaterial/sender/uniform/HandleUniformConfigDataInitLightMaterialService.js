

import * as Log$WonderLog from "../../../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as OptionService$Wonderjs from "../../../../../../atom/OptionService.js";
import * as Caml_builtin_exceptions from "../../../../../../../../../../node_modules/bs-platform/lib/es6/caml_builtin_exceptions.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as AllGLSLLocationService$Wonderjs from "../../../../../../record/all/location/AllGLSLLocationService.js";
import * as HandleModelUniformConfigDataService$Wonderjs from "../../../../../../record/all/sender/uniform/model/HandleModelUniformConfigDataService.js";
import * as HandleCameraUniformConfigDataService$Wonderjs from "../../../../../../record/all/sender/uniform/camera/HandleCameraUniformConfigDataService.js";
import * as HandleMaterialUniformConfigDataService$Wonderjs from "../../../../../../record/all/sender/uniform/material/HandleMaterialUniformConfigDataService.js";
import * as HandleUniformShaderCachableFunctionService$Wonderjs from "../../../../../../record/all/sender/uniform/HandleUniformShaderCachableFunctionService.js";
import * as SendPointLightUniformSendRenderDataService$Wonderjs from "../../../../../render/sub/send_render_data/uniform/light/SendPointLightUniformSendRenderDataService.js";
import * as HandleUniformConfigDataInitShaderAllService$Wonderjs from "../../../../all/sender/uniform/HandleUniformConfigDataInitShaderAllService.js";
import * as SendAmbientLightUniformSendRenderDataService$Wonderjs from "../../../../../render/sub/send_render_data/uniform/light/SendAmbientLightUniformSendRenderDataService.js";
import * as SendDirectionLightUniformSendRenderDataService$Wonderjs from "../../../../../render/sub/send_render_data/uniform/light/SendDirectionLightUniformSendRenderDataService.js";

function _addAmbientLightSendData(param, sendDataArrTuple) {
  var field = param[0];
  if (field === "send") {
    return HandleUniformShaderCachableFunctionService$Wonderjs.addUniformSendDataByType(/* tuple */[
                param[1],
                param[2],
                param[3]
              ], sendDataArrTuple, SendAmbientLightUniformSendRenderDataService$Wonderjs.send);
  } else {
    return Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("_addAmbientLightSendData", "unknow field:" + (String(field) + ""), "", "", ""));
  }
}

function _addDirectionLightSendData(param, sendDataArrTuple) {
  var field = param[0];
  if (field === "send") {
    return HandleUniformShaderCachableFunctionService$Wonderjs.addUniformSendDataByType(/* tuple */[
                param[1],
                param[2],
                param[3]
              ], sendDataArrTuple, SendDirectionLightUniformSendRenderDataService$Wonderjs.send);
  } else {
    return Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("_addDirectionLightSendData", "unknow field:" + (String(field) + ""), "", "", ""));
  }
}

function _addPointLightSendData(param, sendDataArrTuple) {
  var field = param[0];
  if (field === "send") {
    return HandleUniformShaderCachableFunctionService$Wonderjs.addUniformSendDataByType(/* tuple */[
                param[1],
                param[2],
                param[3]
              ], sendDataArrTuple, SendPointLightUniformSendRenderDataService$Wonderjs.send);
  } else {
    return Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("_addPointLightSendData", "unknow field:" + (String(field) + ""), "", "", ""));
  }
}

function _readLightUniform(from, param, sendDataArrTuple) {
  var uniformLocationMap = param[3];
  var uniformCacheMap = param[2];
  var program = param[1];
  var field = param[0];
  switch (from) {
    case "ambientLight" : 
        return _addAmbientLightSendData(/* tuple */[
                    field,
                    program,
                    uniformCacheMap,
                    uniformLocationMap
                  ], sendDataArrTuple);
    case "directionLight" : 
        return _addDirectionLightSendData(/* tuple */[
                    field,
                    program,
                    uniformCacheMap,
                    uniformLocationMap
                  ], sendDataArrTuple);
    case "pointLight" : 
        return _addPointLightSendData(/* tuple */[
                    field,
                    program,
                    uniformCacheMap,
                    uniformLocationMap
                  ], sendDataArrTuple);
    default:
      throw [
            Caml_builtin_exceptions.match_failure,
            /* tuple */[
              "HandleUniformConfigDataInitLightMaterialService.re",
              74,
              2
            ]
          ];
  }
}

function _readUniforms(param, sendDataArrTuple, uniforms) {
  var uniformCacheMap = param[3];
  var uniformLocationMap = param[2];
  var program = param[1];
  var gl = param[0];
  var match = OptionService$Wonderjs.isJsonSerializedValueNone(uniforms);
  if (match) {
    return sendDataArrTuple;
  } else {
    return ArrayService$WonderCommonlib.reduceOneParam((function (sendDataArrTuple, param) {
                  var from = param[/* from */3];
                  var type_ = param[/* type_ */2];
                  var field = param[/* field */1];
                  var name = param[/* name */0];
                  var exit = 0;
                  switch (from) {
                    case "camera" : 
                        return HandleCameraUniformConfigDataService$Wonderjs.addCameraSendData(/* tuple */[
                                    field,
                                    AllGLSLLocationService$Wonderjs.getUniformLocationAndCache(program, name, uniformLocationMap, gl),
                                    name,
                                    type_,
                                    uniformCacheMap
                                  ], sendDataArrTuple);
                    case "lightMaterial" : 
                        return HandleMaterialUniformConfigDataService$Wonderjs.addLightMaterialSendData(/* tuple */[
                                    field,
                                    AllGLSLLocationService$Wonderjs.getUniformLocationAndCache(program, name, uniformLocationMap, gl),
                                    name,
                                    type_,
                                    uniformCacheMap
                                  ], sendDataArrTuple);
                    case "model" : 
                        return HandleModelUniformConfigDataService$Wonderjs.addModelSendData(/* tuple */[
                                    field,
                                    AllGLSLLocationService$Wonderjs.getUniformLocationAndCache(program, name, uniformLocationMap, gl),
                                    name,
                                    type_,
                                    uniformCacheMap
                                  ], sendDataArrTuple);
                    case "ambientLight" : 
                    case "directionLight" : 
                    case "pointLight" : 
                        exit = 1;
                        break;
                    default:
                      return Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("_readUniforms", "unknow from:" + (String(from) + ""), "", "", ""));
                  }
                  if (exit === 1) {
                    return _readLightUniform(from, /* tuple */[
                                field,
                                program,
                                uniformCacheMap,
                                uniformLocationMap
                              ], sendDataArrTuple);
                  }
                  
                }), sendDataArrTuple, OptionService$Wonderjs.unsafeGetJsonSerializedValue(uniforms));
  }
}

function _readUniformSendData(shaderLibDataArr, gl, program, param) {
  return HandleUniformConfigDataInitShaderAllService$Wonderjs.readUniformSendData(shaderLibDataArr, /* tuple */[
              gl,
              program
            ], _readUniforms, /* tuple */[
              param[0],
              param[1]
            ]);
}

function addUniformSendData(gl, param, recordTuple) {
  return HandleUniformConfigDataInitShaderAllService$Wonderjs.addUniformSendData(gl, /* tuple */[
              param[0],
              param[1],
              param[2]
            ], _readUniformSendData, recordTuple);
}

export {
  _addAmbientLightSendData ,
  _addDirectionLightSendData ,
  _addPointLightSendData ,
  _readLightUniform ,
  _readUniforms ,
  _readUniformSendData ,
  addUniformSendData ,
  
}
/* Log-WonderLog Not a pure module */
