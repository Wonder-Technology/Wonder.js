

import * as CloneMaterialMainService$Wonderjs from "../CloneMaterialMainService.js";
import * as CreateBasicMaterialMainService$Wonderjs from "./CreateBasicMaterialMainService.js";
import * as RecordBasicMaterialMainService$Wonderjs from "./RecordBasicMaterialMainService.js";
import * as OperateBasicMaterialMainService$Wonderjs from "./OperateBasicMaterialMainService.js";
import * as ShaderIndexBasicMaterialMainService$Wonderjs from "./ShaderIndexBasicMaterialMainService.js";

function _getData(sourceComponent, state) {
  return /* tuple */[
          OperateBasicMaterialMainService$Wonderjs.getColor(sourceComponent, state),
          OperateBasicMaterialMainService$Wonderjs.getMap(sourceComponent, state)
        ];
}

function _setData(sourceComponent, param, state) {
  var mapOption = param[1];
  var state$1 = OperateBasicMaterialMainService$Wonderjs.setColor(sourceComponent, param[0], state);
  if (mapOption !== undefined) {
    return OperateBasicMaterialMainService$Wonderjs.setMap(sourceComponent, mapOption, state$1);
  } else {
    return state$1;
  }
}

function handleCloneComponent(sourceComponent, countRangeArr, isShareMaterial, state) {
  var match = RecordBasicMaterialMainService$Wonderjs.getRecord(state);
  return CloneMaterialMainService$Wonderjs.handleCloneComponent(/* tuple */[
              sourceComponent,
              countRangeArr,
              isShareMaterial
            ], /* tuple */[
              CreateBasicMaterialMainService$Wonderjs.create,
              _getData,
              _setData,
              ShaderIndexBasicMaterialMainService$Wonderjs.setShaderIndex
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
