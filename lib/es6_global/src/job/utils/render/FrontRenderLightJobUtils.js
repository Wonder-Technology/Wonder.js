

import * as RenderJobUtils$Wonderjs from "./RenderJobUtils.js";
import * as ArrayService$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as ShaderIndexRenderService$Wonderjs from "../../../service/state/render/shader/ShaderIndexRenderService.js";
import * as FrontRenderLightJobCommon$Wonderjs from "../../common/front_render_light/FrontRenderLightJobCommon.js";
import * as DrawModeMeshRendererService$Wonderjs from "../../../service/state/render/meshRenderer/DrawModeMeshRendererService.js";
import * as FrontRenderLightInstanceJobCommon$Wonderjs from "../../common/front_render_light/instance/FrontRenderLightInstanceJobCommon.js";
import * as RenderObjectBufferTypeArrayService$Wonderjs from "../../../service/record/main/render/RenderObjectBufferTypeArrayService.js";
import * as ShaderIndexLightMaterialRenderService$Wonderjs from "../../../service/state/render/material/light/ShaderIndexLightMaterialRenderService.js";

function _getShaderIndex(materialIndex, state) {
  return ShaderIndexRenderService$Wonderjs.getShaderIndex(materialIndex, ShaderIndexLightMaterialRenderService$Wonderjs.getShaderIndex, state);
}

function render(gl, param, state) {
  var sourceInstanceIndices = param[5];
  var geometryIndices = param[4];
  var meshRendererIndices = param[3];
  var materialIndices = param[2];
  var transformIndices = param[1];
  return ArrayService$WonderCommonlib.reduceOneParam((function (state, index) {
                var transformIndex = RenderObjectBufferTypeArrayService$Wonderjs.getComponent(index, transformIndices);
                var materialIndex = RenderObjectBufferTypeArrayService$Wonderjs.getComponent(index, materialIndices);
                var shaderIndex = ShaderIndexRenderService$Wonderjs.getShaderIndex(materialIndex, ShaderIndexLightMaterialRenderService$Wonderjs.getShaderIndex, state);
                var meshRendererIndex = RenderObjectBufferTypeArrayService$Wonderjs.getComponent(index, meshRendererIndices);
                var geometryIndex = RenderObjectBufferTypeArrayService$Wonderjs.getComponent(index, geometryIndices);
                var sourceInstance = RenderObjectBufferTypeArrayService$Wonderjs.getComponent(index, sourceInstanceIndices);
                if (RenderObjectBufferTypeArrayService$Wonderjs.hasSourceInstance(sourceInstance)) {
                  return FrontRenderLightInstanceJobCommon$Wonderjs.render(gl, /* tuple */[
                              transformIndex,
                              materialIndex,
                              shaderIndex,
                              meshRendererIndex,
                              geometryIndex,
                              sourceInstance
                            ], state);
                } else {
                  var state$1 = FrontRenderLightJobCommon$Wonderjs.render(gl, /* tuple */[
                        transformIndex,
                        materialIndex,
                        shaderIndex,
                        meshRendererIndex,
                        geometryIndex
                      ], state);
                  RenderJobUtils$Wonderjs.draw(gl, DrawModeMeshRendererService$Wonderjs.getGlDrawMode(gl, meshRendererIndex, state$1), geometryIndex, state$1);
                  return state$1;
                }
              }), state, param[0]);
}

export {
  _getShaderIndex ,
  render ,
  
}
/* RenderJobUtils-Wonderjs Not a pure module */
