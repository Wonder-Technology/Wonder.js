

import * as MapUnitService$Wonderjs from "../../../primitive/material/MapUnitService.js";
import * as BindTextureRenderService$Wonderjs from "../texture/BindTextureRenderService.js";
import * as UpdateTextureRenderService$Wonderjs from "../texture/UpdateTextureRenderService.js";
import * as OperateRenderSettingService$Wonderjs from "../../../record/render/setting/OperateRenderSettingService.js";

function getTextureIndex(material, mapUnit, getTextureIndexFunc, param) {
  return getTextureIndexFunc(/* tuple */[
              material,
              mapUnit,
              OperateRenderSettingService$Wonderjs.getTextureCountPerMaterial(param[1])
            ], param[0]);
}

function bindAndUpdate(param, getTextureIndexFunc, stateDataTuple) {
  var settingRecord = stateDataTuple[1];
  var textureIndices = stateDataTuple[0];
  var mapUnit = param[2];
  var gl = param[0];
  var match = MapUnitService$Wonderjs.hasMap(mapUnit);
  if (match) {
    var texture = getTextureIndex(param[1], mapUnit, getTextureIndexFunc, /* tuple */[
          textureIndices,
          settingRecord
        ]);
    var state = BindTextureRenderService$Wonderjs.bind(gl, mapUnit, texture, stateDataTuple[2]);
    return /* tuple */[
            textureIndices,
            settingRecord,
            UpdateTextureRenderService$Wonderjs.handleUpdate(gl, texture, state)
          ];
  } else {
    return stateDataTuple;
  }
}

export {
  getTextureIndex ,
  bindAndUpdate ,
  
}
/* BindTextureRenderService-Wonderjs Not a pure module */
