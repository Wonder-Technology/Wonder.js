

import * as InitShaderInitMaterialAllService$Wonderjs from "../../all/shader/InitShaderInitMaterialAllService.js";
import * as HandleGLSLInitLightMaterialService$Wonderjs from "../glsl/HandleGLSLInitLightMaterialService.js";
import * as HandleUniformConfigDataInitLightMaterialService$Wonderjs from "../sender/uniform/HandleUniformConfigDataInitLightMaterialService.js";
import * as HandleAttributeConfigDataInitLightMaterialService$Wonderjs from "../sender/attribute/HandleAttributeConfigDataInitLightMaterialService.js";

function initMaterialShader(materialIndex, param, buildGLSLSourceFunc, state) {
  var partial_arg_000 = state[/* directionLightRecord */1];
  var partial_arg_001 = state[/* pointLightRecord */2];
  var partial_arg = /* tuple */[
    partial_arg_000,
    partial_arg_001
  ];
  return InitShaderInitMaterialAllService$Wonderjs.initMaterialShader(materialIndex, /* tuple */[
              param[0],
              param[1]
            ], /* tuple */[
              buildGLSLSourceFunc,
              (function (param) {
                  return HandleGLSLInitLightMaterialService$Wonderjs.getHandle(partial_arg, param);
                }),
              HandleAttributeConfigDataInitLightMaterialService$Wonderjs.addAttributeSendData,
              HandleUniformConfigDataInitLightMaterialService$Wonderjs.addUniformSendData
            ], /* tuple */[
              state[/* shaderRecord */4],
              state[/* programRecord */5],
              state[/* glslRecord */6],
              state[/* glslSenderRecord */7],
              state[/* glslLocationRecord */8],
              state[/* glslChunkRecord */9]
            ]);
}

function reInitMaterialShader(materialIndex, param, buildGLSLSourceFunc, state) {
  var partial_arg_000 = state[/* directionLightRecord */1];
  var partial_arg_001 = state[/* pointLightRecord */2];
  var partial_arg = /* tuple */[
    partial_arg_000,
    partial_arg_001
  ];
  return InitShaderInitMaterialAllService$Wonderjs.reInitMaterialShader(materialIndex, /* tuple */[
              param[0],
              param[1]
            ], /* tuple */[
              buildGLSLSourceFunc,
              (function (param) {
                  return HandleGLSLInitLightMaterialService$Wonderjs.getHandle(partial_arg, param);
                }),
              HandleAttributeConfigDataInitLightMaterialService$Wonderjs.addAttributeSendData,
              HandleUniformConfigDataInitLightMaterialService$Wonderjs.addUniformSendData
            ], /* tuple */[
              state[/* shaderRecord */4],
              state[/* programRecord */5],
              state[/* glslRecord */6],
              state[/* glslSenderRecord */7],
              state[/* glslLocationRecord */8],
              state[/* glslChunkRecord */9]
            ]);
}

export {
  initMaterialShader ,
  reInitMaterialShader ,
  
}
/* InitShaderInitMaterialAllService-Wonderjs Not a pure module */
