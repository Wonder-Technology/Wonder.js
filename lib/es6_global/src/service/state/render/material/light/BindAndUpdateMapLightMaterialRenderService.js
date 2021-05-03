

import * as IndexAllSourceTextureService$Wonderjs from "../../../../record/all/texture/source/IndexAllSourceTextureService.js";
import * as IndexSourceTextureRenderService$Wonderjs from "../../texture/source/IndexSourceTextureRenderService.js";
import * as MapUnitLightMaterialRenderService$Wonderjs from "./MapUnitLightMaterialRenderService.js";
import * as BindAndUpdateMapMaterialRenderService$Wonderjs from "../BindAndUpdateMapMaterialRenderService.js";
import * as OperateTypeArrayAllLightMaterialService$Wonderjs from "../../../../record/all/material/light/OperateTypeArrayAllLightMaterialService.js";

function bindAndUpdate(gl, material, state) {
  var lightMaterialRecord = state[/* lightMaterialRecord */8];
  var diffuseTextureIndex = OperateTypeArrayAllLightMaterialService$Wonderjs.getTextureIndex(material, lightMaterialRecord[/* diffuseTextureIndices */6]);
  var specularTextureIndex = OperateTypeArrayAllLightMaterialService$Wonderjs.getTextureIndex(material, lightMaterialRecord[/* specularTextureIndices */7]);
  var arrayBufferViewSourceTextureIndexOffset = IndexSourceTextureRenderService$Wonderjs.getArrayBufferViewSourceTextureIndexOffset(state);
  return BindAndUpdateMapMaterialRenderService$Wonderjs.bindAndUpdate(/* tuple */[
              gl,
              material
            ], /* tuple */[
              specularTextureIndex,
              IndexAllSourceTextureService$Wonderjs.getSourceTextureType(specularTextureIndex, arrayBufferViewSourceTextureIndexOffset)
            ], MapUnitLightMaterialRenderService$Wonderjs.setSpecularMapUnit, BindAndUpdateMapMaterialRenderService$Wonderjs.bindAndUpdate(/* tuple */[
                  gl,
                  material
                ], /* tuple */[
                  diffuseTextureIndex,
                  IndexAllSourceTextureService$Wonderjs.getSourceTextureType(diffuseTextureIndex, arrayBufferViewSourceTextureIndexOffset)
                ], MapUnitLightMaterialRenderService$Wonderjs.setDiffuseMapUnit, state));
}

export {
  bindAndUpdate ,
  
}
/* IndexAllSourceTextureService-Wonderjs Not a pure module */
