

import * as RenderJobUtils$Wonderjs from "../../job/utils/render/RenderJobUtils.js";
import * as UseProgramRenderService$Wonderjs from "../../service/state/render/program/UseProgramRenderService.js";
import * as ShaderIndexRenderService$Wonderjs from "../../service/state/render/shader/ShaderIndexRenderService.js";
import * as CreateRenderStateMainService$Wonderjs from "../../service/state/main/render/CreateRenderStateMainService.js";
import * as ShaderIndexBasicMaterialRenderService$Wonderjs from "../../service/state/render/material/basic/ShaderIndexBasicMaterialRenderService.js";
import * as CreateGetRenederDataSubStateRenderService$Wonderjs from "../../service/state/render/sub/get_render_data/CreateGetRenederDataSubStateRenderService.js";
import * as CreateSendRenederDataSubStateRenderService$Wonderjs from "../../service/state/render/sub/send_render_data/CreateSendRenederDataSubStateRenderService.js";

function getShaderIndex(materialIndex, state) {
  return ShaderIndexRenderService$Wonderjs.getShaderIndex(materialIndex, ShaderIndexBasicMaterialRenderService$Wonderjs.getShaderIndex, CreateRenderStateMainService$Wonderjs.createRenderState(state));
}

function useByShaderIndex(gl, shaderIndex, state) {
  UseProgramRenderService$Wonderjs.useByShaderIndex(gl, shaderIndex, CreateRenderStateMainService$Wonderjs.createRenderState(state));
  return state;
}

function sendAttributeData(gl, indexTuple, state) {
  var renderState = CreateRenderStateMainService$Wonderjs.createRenderState(state);
  RenderJobUtils$Wonderjs.sendAttributeData(gl, indexTuple, CreateSendRenederDataSubStateRenderService$Wonderjs.createState(renderState), renderState);
  return state;
}

function sendUniformRenderObjectModelData(gl, shaderIndex, transformIndex, state) {
  var renderState = CreateRenderStateMainService$Wonderjs.createRenderState(state);
  RenderJobUtils$Wonderjs.sendUniformRenderObjectModelData(gl, /* tuple */[
        shaderIndex,
        transformIndex
      ], /* tuple */[
        CreateGetRenederDataSubStateRenderService$Wonderjs.createState(renderState),
        renderState
      ]);
  return state;
}

function sendUniformRenderObjectMaterialData(gl, shaderIndex, materialIndex, state) {
  var renderState = CreateRenderStateMainService$Wonderjs.createRenderState(state);
  RenderJobUtils$Wonderjs.sendUniformRenderObjectMaterialData(gl, /* tuple */[
        shaderIndex,
        materialIndex
      ], CreateGetRenederDataSubStateRenderService$Wonderjs.createState(renderState), renderState);
  return state;
}

function draw(gl, meshRendererIndex, geometryIndex, state) {
  RenderJobUtils$Wonderjs.draw(gl, meshRendererIndex, geometryIndex, CreateRenderStateMainService$Wonderjs.createRenderState(state));
  return state;
}

export {
  getShaderIndex ,
  useByShaderIndex ,
  sendAttributeData ,
  sendUniformRenderObjectModelData ,
  sendUniformRenderObjectMaterialData ,
  draw ,
  
}
/* RenderJobUtils-Wonderjs Not a pure module */
