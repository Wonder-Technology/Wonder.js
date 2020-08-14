

import * as Curry from "../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Log$WonderLog from "../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as OptionService$Wonderjs from "../../../../atom/OptionService.js";
import * as ShaderChunkSystem$Wonderjs from "../../../../../glsl/ShaderChunkSystem.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";

var webgl1_main_begin = "void main(void){\n";

var webgl1_main_end = "}\n";

function _generateAttributeSource(shaderLibDataArr) {
  return shaderLibDataArr.reduce((function (result, param) {
                var variables = param[/* variables */2];
                var match = OptionService$Wonderjs.isJsonSerializedValueNone(variables);
                if (match) {
                  return result;
                } else {
                  var optionalAttributes = OptionService$Wonderjs.unsafeGetJsonSerializedValue(variables)[/* attributes */1];
                  var match$1 = OptionService$Wonderjs.isJsonSerializedValueNone(optionalAttributes);
                  if (match$1) {
                    return result;
                  } else {
                    return result + OptionService$Wonderjs.unsafeGetJsonSerializedValue(optionalAttributes).reduce((function (result, param) {
                                  var type_ = param[/* type_ */2];
                                  var name = param[/* name */0];
                                  var match = !OptionService$Wonderjs.isJsonSerializedValueNone(name) && !OptionService$Wonderjs.isJsonSerializedValueNone(type_);
                                  if (match) {
                                    var name$1 = OptionService$Wonderjs.unsafeGetJsonSerializedValue(name);
                                    var type_$1 = OptionService$Wonderjs.unsafeGetJsonSerializedValue(type_);
                                    return result + ("attribute " + (String(type_$1) + (" " + (String(name$1) + ";\n  "))));
                                  } else {
                                    return result;
                                  }
                                }), "");
                  }
                }
              }), "");
}

function _isInSource(key, source) {
  return source.indexOf(key) > -1;
}

function _generateUniformSourceType(type_) {
  if (type_ === "float3") {
    return "vec3";
  } else {
    return type_;
  }
}

function _generateUniformSource(shaderLibDataArr, sourceVarDeclare, sourceFuncDefine, sourceBody) {
  return shaderLibDataArr.reduce((function (result, param) {
                var variables = param[/* variables */2];
                var match = OptionService$Wonderjs.isJsonSerializedValueNone(variables);
                if (match) {
                  return result;
                } else {
                  var optionalUniforms = OptionService$Wonderjs.unsafeGetJsonSerializedValue(variables)[/* uniforms */0];
                  var match$1 = OptionService$Wonderjs.isJsonSerializedValueNone(optionalUniforms);
                  if (match$1) {
                    return result;
                  } else {
                    return result + OptionService$Wonderjs.unsafeGetJsonSerializedValue(optionalUniforms).filter((function (param) {
                                    var name = param[/* name */0];
                                    if (_isInSource(name, sourceVarDeclare) || _isInSource(name, sourceFuncDefine)) {
                                      return true;
                                    } else {
                                      return _isInSource(name, sourceBody);
                                    }
                                  })).reduce((function (result, param) {
                                  var type_ = _generateUniformSourceType(param[/* type_ */2]);
                                  return result + ("uniform " + (String(type_) + (" " + (String(param[/* name */0]) + ";\n"))));
                                }), "");
                  }
                }
              }), "");
}

function _setSource(sourceChunk, param) {
  var sourceTop = sourceChunk[/* top */0];
  var sourceDefine = sourceChunk[/* define */1];
  var sourceVarDeclare = sourceChunk[/* varDeclare */2];
  var sourceFuncDeclare = sourceChunk[/* funcDeclare */3];
  var sourceFuncDefine = sourceChunk[/* funcDefine */4];
  var sourceBody = sourceChunk[/* body */5];
  var top = param[/* top */0];
  var define = param[/* define */1];
  var varDeclare = param[/* varDeclare */2];
  var funcDeclare = param[/* funcDeclare */3];
  var funcDefine = param[/* funcDefine */4];
  var body = param[/* body */5];
  sourceChunk[/* top */0] = sourceTop + top;
  sourceChunk[/* define */1] = sourceDefine + define;
  sourceChunk[/* varDeclare */2] = sourceVarDeclare + varDeclare;
  sourceChunk[/* funcDeclare */3] = sourceFuncDeclare + funcDeclare;
  sourceChunk[/* funcDefine */4] = sourceFuncDefine + funcDefine;
  sourceChunk[/* body */5] = sourceBody + body;
  return sourceChunk;
}

function _buildBody(param, webgl1_main_end) {
  var body = param[/* body */5];
  return body + webgl1_main_end;
}

function _buildVarDeclare(param, shaderLibDataArr) {
  var varDeclare = param[/* varDeclare */2];
  var funcDefine = param[/* funcDefine */4];
  var body = param[/* body */5];
  return varDeclare + ("\n" + _generateUniformSource(shaderLibDataArr, varDeclare, funcDefine, body));
}

function _addAlllParts(param) {
  var top = param[/* top */0];
  var define = param[/* define */1];
  var varDeclare = param[/* varDeclare */2];
  var funcDeclare = param[/* funcDeclare */3];
  var funcDefine = param[/* funcDefine */4];
  var body = param[/* body */5];
  return top + (define + (varDeclare + (funcDeclare + (funcDefine + body))));
}

function _execHandle(name, execHandleFunc) {
  return Curry._1(execHandleFunc, name);
}

function _createEmptyChunk(param) {
  return /* record */[
          /* top */"",
          /* define */"",
          /* varDeclare */"",
          /* funcDeclare */"",
          /* funcDefine */"",
          /* body */""
        ];
}

function _buildVsAndFsByType(param, param$1, execHandleFunc, glslChunkRecord) {
  var name = param$1[1];
  var type_ = param$1[0];
  var fs = param[1];
  var vs = param[0];
  switch (type_) {
    case "fs" : 
        return /* tuple */[
                vs,
                _setSource(fs, ShaderChunkSystem$Wonderjs.getChunk(name, glslChunkRecord))
              ];
    case "fs_function" : 
        return /* tuple */[
                vs,
                _setSource(fs, Curry._1(execHandleFunc, name))
              ];
    case "vs" : 
        return /* tuple */[
                _setSource(vs, ShaderChunkSystem$Wonderjs.getChunk(name, glslChunkRecord)),
                fs
              ];
    case "vs_function" : 
        return /* tuple */[
                _setSource(vs, Curry._1(execHandleFunc, name)),
                fs
              ];
    default:
      return Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("buildGLSLSource", "unknown glsl type: " + (String(type_) + ""), "", "", "name: " + (String(name) + "")));
  }
}

function _buildVsAndFs(param, shaderLibDataArr, execHandleFunc, glslChunkRecord) {
  return ArrayService$WonderCommonlib.reduceOneParam((function (glslTuple, param) {
                var glsls = param[/* glsls */1];
                var match = OptionService$Wonderjs.isJsonSerializedValueNone(glsls);
                if (match) {
                  return glslTuple;
                } else {
                  return ArrayService$WonderCommonlib.reduceOneParam((function (sourceTuple, param) {
                                return _buildVsAndFsByType(sourceTuple, /* tuple */[
                                            param[/* type_ */0],
                                            param[/* name */1]
                                          ], execHandleFunc, glslChunkRecord);
                              }), glslTuple, OptionService$Wonderjs.unsafeGetJsonSerializedValue(glsls));
                }
              }), /* tuple */[
              param[0],
              param[1]
            ], shaderLibDataArr);
}

function buildGLSLSource(shaderLibDataArr, execHandleFunc, param) {
  var precision = param[0][/* precision */0];
  var vs = /* record */[
    /* top */"",
    /* define */"",
    /* varDeclare */"",
    /* funcDeclare */"",
    /* funcDefine */"",
    /* body */""
  ];
  var fs = /* record */[
    /* top */"",
    /* define */"",
    /* varDeclare */"",
    /* funcDeclare */"",
    /* funcDefine */"",
    /* body */""
  ];
  vs[/* body */5] = vs[/* body */5] + webgl1_main_begin;
  fs[/* body */5] = fs[/* body */5] + webgl1_main_begin;
  var precision$1 = OptionService$Wonderjs.unsafeGet(precision);
  vs[/* top */0] = precision$1 + vs[/* top */0];
  fs[/* top */0] = precision$1 + fs[/* top */0];
  var match = _buildVsAndFs(/* tuple */[
        vs,
        fs
      ], shaderLibDataArr, execHandleFunc, param[1]);
  var fs$1 = match[1];
  var vs$1 = match[0];
  vs$1[/* body */5] = _buildBody(vs$1, webgl1_main_end);
  fs$1[/* body */5] = _buildBody(fs$1, webgl1_main_end);
  vs$1[/* varDeclare */2] = "\n" + (_generateAttributeSource(shaderLibDataArr) + vs$1[/* varDeclare */2]);
  vs$1[/* varDeclare */2] = _buildVarDeclare(vs$1, shaderLibDataArr);
  fs$1[/* varDeclare */2] = _buildVarDeclare(fs$1, shaderLibDataArr);
  return /* tuple */[
          _addAlllParts(vs$1),
          _addAlllParts(fs$1)
        ];
}

export {
  webgl1_main_begin ,
  webgl1_main_end ,
  _generateAttributeSource ,
  _isInSource ,
  _generateUniformSourceType ,
  _generateUniformSource ,
  _setSource ,
  _buildBody ,
  _buildVarDeclare ,
  _addAlllParts ,
  _execHandle ,
  _createEmptyChunk ,
  _buildVsAndFsByType ,
  _buildVsAndFs ,
  buildGLSLSource ,
  
}
/* Log-WonderLog Not a pure module */
