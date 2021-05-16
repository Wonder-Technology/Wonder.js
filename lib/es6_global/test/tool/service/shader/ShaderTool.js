

import * as ShaderIndexRenderService$Wonderjs from "../../../../src/service/state/render/shader/ShaderIndexRenderService.js";
import * as CreateRenderStateMainService$Wonderjs from "../../../../src/service/state/main/render/CreateRenderStateMainService.js";
import * as NoMaterialShaderIndexAllShaderService$Wonderjs from "../../../../src/service/record/all/shader/NoMaterialShaderIndexAllShaderService.js";
import * as ShaderIndexLightMaterialRenderService$Wonderjs from "../../../../src/service/state/render/material/light/ShaderIndexLightMaterialRenderService.js";

function getShaderRecord(state) {
  return state[/* shaderRecord */28];
}

function getShaderIndex(material, state) {
  var renderState = CreateRenderStateMainService$Wonderjs.createRenderState(state);
  return ShaderIndexRenderService$Wonderjs.getShaderIndex(material, ShaderIndexLightMaterialRenderService$Wonderjs.getShaderIndex, renderState);
}

function getNoMaterialShaderIndex(shaderName, param) {
  return NoMaterialShaderIndexAllShaderService$Wonderjs.unsafeGetShaderIndex(shaderName, param[/* shaderRecord */28]);
}

export {
  getShaderRecord ,
  getShaderIndex ,
  getNoMaterialShaderIndex ,
  
}
/* ShaderIndexRenderService-Wonderjs Not a pure module */
