

import * as CloneMaterialMainService$Wonderjs from "../CloneMaterialMainService.js";
import * as NameLightMaterialMainService$Wonderjs from "./NameLightMaterialMainService.js";
import * as CreateLightMaterialMainService$Wonderjs from "./CreateLightMaterialMainService.js";
import * as RecordLightMaterialMainService$Wonderjs from "./RecordLightMaterialMainService.js";
import * as OperateLightMaterialMainService$Wonderjs from "./OperateLightMaterialMainService.js";
import * as ShaderIndexLightMaterialMainService$Wonderjs from "./ShaderIndexLightMaterialMainService.js";

function _getData(sourceComponent, state) {
  return /* tuple */[
          NameLightMaterialMainService$Wonderjs.getName(sourceComponent, state),
          OperateLightMaterialMainService$Wonderjs.getDiffuseColor(sourceComponent, state),
          OperateLightMaterialMainService$Wonderjs.getSpecularColor(sourceComponent, state),
          OperateLightMaterialMainService$Wonderjs.getShininess(sourceComponent, state),
          OperateLightMaterialMainService$Wonderjs.getDiffuseMap(sourceComponent, state),
          OperateLightMaterialMainService$Wonderjs.getSpecularMap(sourceComponent, state)
        ];
}

function _setData(sourceComponent, param, state) {
  var specularMapOption = param[5];
  var diffuseMapOption = param[4];
  var nameOption = param[0];
  var state$1 = nameOption !== undefined ? NameLightMaterialMainService$Wonderjs.setName(sourceComponent, nameOption, state) : state;
  var state$2 = OperateLightMaterialMainService$Wonderjs.setShininess(sourceComponent, param[3], OperateLightMaterialMainService$Wonderjs.setSpecularColor(sourceComponent, param[2], OperateLightMaterialMainService$Wonderjs.setDiffuseColor(sourceComponent, param[1], state$1)));
  var state$3 = diffuseMapOption !== undefined ? OperateLightMaterialMainService$Wonderjs.setDiffuseMap(sourceComponent, diffuseMapOption, state$2) : state$2;
  if (specularMapOption !== undefined) {
    return OperateLightMaterialMainService$Wonderjs.setSpecularMap(sourceComponent, specularMapOption, state$3);
  } else {
    return state$3;
  }
}

function handleCloneComponent(sourceComponent, countRangeArr, isShareMaterial, state) {
  var match = RecordLightMaterialMainService$Wonderjs.getRecord(state);
  return CloneMaterialMainService$Wonderjs.handleCloneComponent(/* tuple */[
              sourceComponent,
              countRangeArr,
              isShareMaterial
            ], /* tuple */[
              CreateLightMaterialMainService$Wonderjs.create,
              _getData,
              _setData,
              ShaderIndexLightMaterialMainService$Wonderjs.setShaderIndex
            ], /* tuple */[
              match[/* shaderIndices */2],
              state
            ]);
}

export {
  _getData ,
  _setData ,
  handleCloneComponent ,
  
}
/* CloneMaterialMainService-Wonderjs Not a pure module */
