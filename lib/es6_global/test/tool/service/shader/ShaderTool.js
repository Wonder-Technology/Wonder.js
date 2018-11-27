

import * as ShaderIndexRenderService$Wonderjs from "../../../../src/service/state/render/shader/ShaderIndexRenderService.js";
import * as CreateRenderStateMainService$Wonderjs from "../../../../src/service/state/main/render/CreateRenderStateMainService.js";
import * as ShaderIndexRenderShaderService$Wonderjs from "../../../../src/service/record/render/shader/ShaderIndexRenderShaderService.js";
import * as ShaderIndexLightMaterialRenderService$Wonderjs from "../../../../src/service/state/render/material/light/ShaderIndexLightMaterialRenderService.js";

function getShaderRecord(state) {
  return state[/* shaderRecord */25];
}

function getShaderIndex(material, state) {
  var renderState = CreateRenderStateMainService$Wonderjs.createRenderState(state);
  return ShaderIndexRenderService$Wonderjs.getShaderIndex(material, ShaderIndexLightMaterialRenderService$Wonderjs.getShaderIndex, renderState);
}

function getAllShaderIndexArray(state) {
  return ShaderIndexRenderShaderService$Wonderjs.getAllShaderIndexArray(CreateRenderStateMainService$Wonderjs.createRenderState(state)[/* shaderRecord */19]);
}

export {
  getShaderRecord ,
  getShaderIndex ,
  getAllShaderIndexArray ,
  
}
/* ShaderIndexRenderService-Wonderjs Not a pure module */
