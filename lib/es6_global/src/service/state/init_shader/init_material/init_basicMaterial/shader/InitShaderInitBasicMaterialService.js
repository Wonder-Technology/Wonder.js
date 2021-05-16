

import * as InitShaderInitMaterialAllService$Wonderjs from "../../all/shader/InitShaderInitMaterialAllService.js";
import * as HandleGLSLInitBasicMaterialService$Wonderjs from "../glsl/HandleGLSLInitBasicMaterialService.js";
import * as HandleUniformConfigDataInitBasicMaterialService$Wonderjs from "../sender/uniform/HandleUniformConfigDataInitBasicMaterialService.js";
import * as HandleAttributeConfigDataInitBasicMaterialService$Wonderjs from "../sender/attribute/HandleAttributeConfigDataInitBasicMaterialService.js";

function initMaterialShader(materialIndex, param, buildGLSLSourceFunc, state) {
  return InitShaderInitMaterialAllService$Wonderjs.initMaterialShader(materialIndex, /* tuple */[
              param[0],
              param[1]
            ], /* tuple */[
              buildGLSLSourceFunc,
              HandleGLSLInitBasicMaterialService$Wonderjs.getHandle,
              HandleAttributeConfigDataInitBasicMaterialService$Wonderjs.addAttributeSendData,
              HandleUniformConfigDataInitBasicMaterialService$Wonderjs.addUniformSendData
            ], /* tuple */[
              state[/* shaderRecord */2],
              state[/* programRecord */3],
              state[/* glslRecord */4],
              state[/* glslSenderRecord */5],
              state[/* glslLocationRecord */6],
              state[/* glslChunkRecord */7]
            ]);
}

function reInitMaterialShader(materialIndex, param, buildGLSLSourceFunc, state) {
  return InitShaderInitMaterialAllService$Wonderjs.reInitMaterialShader(materialIndex, /* tuple */[
              param[0],
              param[1]
            ], /* tuple */[
              buildGLSLSourceFunc,
              HandleGLSLInitBasicMaterialService$Wonderjs.getHandle,
              HandleAttributeConfigDataInitBasicMaterialService$Wonderjs.addAttributeSendData,
              HandleUniformConfigDataInitBasicMaterialService$Wonderjs.addUniformSendData
            ], /* tuple */[
              state[/* shaderRecord */2],
              state[/* programRecord */3],
              state[/* glslRecord */4],
              state[/* glslSenderRecord */5],
              state[/* glslLocationRecord */6],
              state[/* glslChunkRecord */7]
            ]);
}

export {
  initMaterialShader ,
  reInitMaterialShader ,
  
}
/* InitShaderInitMaterialAllService-Wonderjs Not a pure module */
