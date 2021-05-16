

import * as RenderJobUtils$Wonderjs from "./RenderJobUtils.js";
import * as ArrayService$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as RenderBasicJobCommon$Wonderjs from "../../common/render_basic/RenderBasicJobCommon.js";
import * as RenderObjectGlStateUtils$Wonderjs from "./RenderObjectGlStateUtils.js";
import * as ShaderIndexRenderService$Wonderjs from "../../../service/state/render/shader/ShaderIndexRenderService.js";
import * as DrawModeMeshRendererService$Wonderjs from "../../../service/state/render/meshRenderer/DrawModeMeshRendererService.js";
import * as RenderBasicInstanceJobCommon$Wonderjs from "../../common/render_basic/instance/RenderBasicInstanceJobCommon.js";
import * as OperateAllTextureRenderService$Wonderjs from "../../../service/state/render/texture/allTexture/OperateAllTextureRenderService.js";
import * as RenderObjectBufferTypeArrayService$Wonderjs from "../../../service/record/main/render/RenderObjectBufferTypeArrayService.js";
import * as ShaderIndexBasicMaterialRenderService$Wonderjs from "../../../service/state/render/material/basic/ShaderIndexBasicMaterialRenderService.js";
import * as OperateTypeArrayAllBasicMaterialService$Wonderjs from "../../../service/record/all/material/basic/OperateTypeArrayAllBasicMaterialService.js";

function _getShaderIndex(materialIndex, state) {
  return ShaderIndexRenderService$Wonderjs.getShaderIndex(materialIndex, ShaderIndexBasicMaterialRenderService$Wonderjs.getShaderIndex, state);
}

function _setRenderObjectGlState(gl, materialIndex, state) {
  RenderObjectGlStateUtils$Wonderjs.setRenderObjectGlState(gl, OperateTypeArrayAllBasicMaterialService$Wonderjs.getIsDepthTest(materialIndex, state[/* basicMaterialRecord */7][/* isDepthTests */2]), state[/* deviceManagerRecord */20]);
  return state;
}

function render(gl, param, state) {
  var sourceInstanceIndices = param[5];
  var geometryIndices = param[4];
  var meshRendererIndices = param[3];
  var materialIndices = param[2];
  var transformIndices = param[1];
  return ArrayService$WonderCommonlib.reduceOneParam((function (state, index) {
                var state$1 = OperateAllTextureRenderService$Wonderjs.resetActivedTextureUnitIndex(state);
                var transformIndex = RenderObjectBufferTypeArrayService$Wonderjs.getComponent(index, transformIndices);
                var materialIndex = RenderObjectBufferTypeArrayService$Wonderjs.getComponent(index, materialIndices);
                var shaderIndex = ShaderIndexRenderService$Wonderjs.getShaderIndex(materialIndex, ShaderIndexBasicMaterialRenderService$Wonderjs.getShaderIndex, state$1);
                var meshRendererIndex = RenderObjectBufferTypeArrayService$Wonderjs.getComponent(index, meshRendererIndices);
                var geometryIndex = RenderObjectBufferTypeArrayService$Wonderjs.getComponent(index, geometryIndices);
                var sourceInstance = RenderObjectBufferTypeArrayService$Wonderjs.getComponent(index, sourceInstanceIndices);
                var state$2 = _setRenderObjectGlState(gl, materialIndex, state$1);
                if (RenderObjectBufferTypeArrayService$Wonderjs.hasSourceInstance(sourceInstance)) {
                  return RenderBasicInstanceJobCommon$Wonderjs.render(gl, /* tuple */[
                              transformIndex,
                              materialIndex,
                              shaderIndex,
                              meshRendererIndex,
                              geometryIndex,
                              sourceInstance
                            ], state$2);
                } else {
                  var state$3 = RenderBasicJobCommon$Wonderjs.render(gl, /* tuple */[
                        transformIndex,
                        materialIndex,
                        shaderIndex,
                        meshRendererIndex,
                        geometryIndex
                      ], state$2);
                  RenderJobUtils$Wonderjs.draw(gl, DrawModeMeshRendererService$Wonderjs.getGlDrawMode(gl, meshRendererIndex, state$3), geometryIndex, state$3);
                  return state$3;
                }
              }), state, param[0]);
}

export {
  _getShaderIndex ,
  _setRenderObjectGlState ,
  render ,
  
}
/* RenderJobUtils-Wonderjs Not a pure module */
