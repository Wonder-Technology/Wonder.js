

import * as AllProgramService$Wonderjs from "../../../record/all/program/AllProgramService.js";
import * as ShaderIndexAllShaderService$Wonderjs from "../../../record/all/shader/ShaderIndexAllShaderService.js";
import * as BuildShaderSourceInitShaderAllService$Wonderjs from "../all/shader/BuildShaderSourceInitShaderAllService.js";
import * as HandleGLSLInitNoMaterialShaderService$Wonderjs from "./glsl/HandleGLSLInitNoMaterialShaderService.js";
import * as NoMaterialShaderIndexAllShaderService$Wonderjs from "../../../record/all/shader/NoMaterialShaderIndexAllShaderService.js";
import * as HandleUniformConfigDataInitNoMaterialShaderService$Wonderjs from "./sender/uniform/HandleUniformConfigDataInitNoMaterialShaderService.js";
import * as HandleAttributeConfigDataInitNoMaterialShaderService$Wonderjs from "./sender/attribute/HandleAttributeConfigDataInitNoMaterialShaderService.js";

function _createProgramAndInit(gl, shaderIndex, param, programRecord) {
  return AllProgramService$Wonderjs.initShader(param[0], param[1], gl, AllProgramService$Wonderjs.registerProgram(shaderIndex, programRecord, gl.createProgram()));
}

function init(param, state) {
  var shaderRecord = state[/* shaderRecord */1];
  var shaderLibDataArr = param[1];
  var gl = param[0];
  var shaderIndex = ShaderIndexAllShaderService$Wonderjs.genereateShaderIndex(shaderRecord);
  NoMaterialShaderIndexAllShaderService$Wonderjs.setShaderIndex(param[2], shaderIndex, shaderRecord);
  var match = BuildShaderSourceInitShaderAllService$Wonderjs.buildGLSLSource(shaderLibDataArr, HandleGLSLInitNoMaterialShaderService$Wonderjs.getHandle, /* tuple */[
        state[/* glslRecord */3],
        state[/* glslChunkRecord */6]
      ]);
  var program = _createProgramAndInit(gl, shaderIndex, /* tuple */[
        match[0],
        match[1]
      ], state[/* programRecord */2]);
  var recordTuple = HandleAttributeConfigDataInitNoMaterialShaderService$Wonderjs.addAttributeSendData(/* tuple */[
        gl,
        shaderIndex,
        program
      ], shaderLibDataArr, /* tuple */[
        state[/* glslSenderRecord */4],
        state[/* glslLocationRecord */5]
      ]);
  HandleUniformConfigDataInitNoMaterialShaderService$Wonderjs.addUniformSendData(gl, /* tuple */[
        program,
        shaderIndex,
        shaderLibDataArr
      ], recordTuple);
  return shaderIndex;
}

export {
  _createProgramAndInit ,
  init ,
  
}
/* AllProgramService-Wonderjs Not a pure module */
