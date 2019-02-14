

import * as OperateTypeArrayBasicMaterialService$Wonderjs from "../../../../record/all/material/basic/OperateTypeArrayBasicMaterialService.js";
import * as BindAndUpdateMapMaterialRenderService$Wonderjs from "../BindAndUpdateMapMaterialRenderService.js";

function bindAndUpdate(gl, material, state) {
  var basicMaterialRecord = state[/* basicMaterialRecord */7];
  var mapUnit = OperateTypeArrayBasicMaterialService$Wonderjs.getMapUnit(material, basicMaterialRecord[/* mapUnits */3]);
  return BindAndUpdateMapMaterialRenderService$Wonderjs.bindAndUpdate(/* tuple */[
                gl,
                material,
                mapUnit
              ], OperateTypeArrayBasicMaterialService$Wonderjs.getTextureIndex, /* tuple */[
                basicMaterialRecord[/* textureIndices */2],
                state[/* settingRecord */19],
                state
              ])[2];
}

export {
  bindAndUpdate ,
  
}
/* OperateTypeArrayBasicMaterialService-Wonderjs Not a pure module */
