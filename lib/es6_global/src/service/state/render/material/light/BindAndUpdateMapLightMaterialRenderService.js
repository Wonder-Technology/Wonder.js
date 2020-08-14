

import * as OperateTypeArrayLightMaterialService$Wonderjs from "../../../../record/all/material/light/OperateTypeArrayLightMaterialService.js";
import * as BindAndUpdateMapMaterialRenderService$Wonderjs from "../BindAndUpdateMapMaterialRenderService.js";

function bindAndUpdate(gl, material, state) {
  var lightMaterialRecord = state[/* lightMaterialRecord */8];
  var diffuseMapUnit = OperateTypeArrayLightMaterialService$Wonderjs.getDiffuseMapUnit(material, lightMaterialRecord[/* diffuseMapUnits */5]);
  var specularMapUnit = OperateTypeArrayLightMaterialService$Wonderjs.getSpecularMapUnit(material, lightMaterialRecord[/* specularMapUnits */6]);
  return BindAndUpdateMapMaterialRenderService$Wonderjs.bindAndUpdate(/* tuple */[
                gl,
                material,
                specularMapUnit
              ], OperateTypeArrayLightMaterialService$Wonderjs.getTextureIndex, BindAndUpdateMapMaterialRenderService$Wonderjs.bindAndUpdate(/* tuple */[
                    gl,
                    material,
                    diffuseMapUnit
                  ], OperateTypeArrayLightMaterialService$Wonderjs.getTextureIndex, /* tuple */[
                    lightMaterialRecord[/* textureIndices */4],
                    state[/* settingRecord */19],
                    state
                  ]))[2];
}

export {
  bindAndUpdate ,
  
}
/* OperateTypeArrayLightMaterialService-Wonderjs Not a pure module */
