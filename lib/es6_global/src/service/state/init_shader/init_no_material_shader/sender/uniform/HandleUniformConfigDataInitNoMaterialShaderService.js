

import * as Log$WonderLog from "./../../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as OptionService$Wonderjs from "../../../../../atom/OptionService.js";
import * as ArrayService$WonderCommonlib from "./../../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as AllGLSLLocationService$Wonderjs from "../../../../../record/all/location/AllGLSLLocationService.js";
import * as HandleCameraUniformConfigDataService$Wonderjs from "../../../../../record/all/sender/uniform/camera/HandleCameraUniformConfigDataService.js";
import * as HandleUniformConfigDataInitShaderAllService$Wonderjs from "../../../all/sender/uniform/HandleUniformConfigDataInitShaderAllService.js";
import * as HandleNoMaterialShaderUniformConfigDataService$Wonderjs from "../../../../../record/all/sender/uniform/no_material_shader/HandleNoMaterialShaderUniformConfigDataService.js";
import * as HandleNoMaterialShaderModelUniformConfigDataService$Wonderjs from "../../../../../record/all/sender/uniform/no_material_shader/HandleNoMaterialShaderModelUniformConfigDataService.js";

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
                  switch (from) {
                    case "camera" : 
                        return HandleCameraUniformConfigDataService$Wonderjs.addCameraSendData(/* tuple */[
                                    field,
                                    AllGLSLLocationService$Wonderjs.getUniformLocationAndCache(program, name, uniformLocationMap, gl),
                                    name,
                                    type_,
                                    uniformCacheMap
                                  ], sendDataArrTuple);
                    case "expand_model" : 
                        return HandleNoMaterialShaderModelUniformConfigDataService$Wonderjs.addExpandModelSendData(/* tuple */[
                                    field,
                                    AllGLSLLocationService$Wonderjs.getUniformLocationAndCache(program, name, uniformLocationMap, gl),
                                    name,
                                    type_,
                                    uniformCacheMap
                                  ], sendDataArrTuple);
                    case "model" : 
                        return HandleNoMaterialShaderModelUniformConfigDataService$Wonderjs.addModelSendData(/* tuple */[
                                    field,
                                    AllGLSLLocationService$Wonderjs.getUniformLocationAndCache(program, name, uniformLocationMap, gl),
                                    name,
                                    type_,
                                    uniformCacheMap
                                  ], sendDataArrTuple);
                    case "no_material_shader" : 
                        return HandleNoMaterialShaderUniformConfigDataService$Wonderjs.addSendData(/* tuple */[
                                    field,
                                    AllGLSLLocationService$Wonderjs.getUniformLocationAndCache(program, name, uniformLocationMap, gl),
                                    name,
                                    type_,
                                    uniformCacheMap
                                  ], sendDataArrTuple);
                    default:
                      return Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("_readUniforms", "unknow from:" + (String(from) + ""), "", "", ""));
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
  _readUniforms ,
  _readUniformSendData ,
  addUniformSendData ,
  
}
/* Log-WonderLog Not a pure module */
