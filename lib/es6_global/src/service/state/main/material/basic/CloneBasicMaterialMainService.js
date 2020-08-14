

import * as CloneMaterialMainService$Wonderjs from "../CloneMaterialMainService.js";
import * as NameBasicMaterialMainService$Wonderjs from "./NameBasicMaterialMainService.js";
import * as CreateBasicMaterialMainService$Wonderjs from "./CreateBasicMaterialMainService.js";
import * as RecordBasicMaterialMainService$Wonderjs from "./RecordBasicMaterialMainService.js";
import * as OperateBasicMaterialMainService$Wonderjs from "./OperateBasicMaterialMainService.js";
import * as ShaderIndexBasicMaterialMainService$Wonderjs from "./ShaderIndexBasicMaterialMainService.js";

function _getData(sourceComponent, state) {
  return /* tuple */[
          NameBasicMaterialMainService$Wonderjs.getName(sourceComponent, state),
          OperateBasicMaterialMainService$Wonderjs.getColor(sourceComponent, state),
          OperateBasicMaterialMainService$Wonderjs.getMap(sourceComponent, state),
          OperateBasicMaterialMainService$Wonderjs.getIsDepthTest(sourceComponent, state),
          OperateBasicMaterialMainService$Wonderjs.getAlpha(sourceComponent, state)
        ];
}

function _setData(sourceComponent, param, state) {
  var mapOption = param[2];
  var nameOption = param[0];
  var state$1 = nameOption !== undefined ? NameBasicMaterialMainService$Wonderjs.setName(sourceComponent, nameOption, state) : state;
  var state$2 = OperateBasicMaterialMainService$Wonderjs.setColor(sourceComponent, param[1], state$1);
  var state$3 = mapOption !== undefined ? OperateBasicMaterialMainService$Wonderjs.setMap(sourceComponent, mapOption, state$2) : state$2;
  var state$4 = OperateBasicMaterialMainService$Wonderjs.setIsDepthTest(sourceComponent, param[3], state$3);
  return OperateBasicMaterialMainService$Wonderjs.setAlpha(sourceComponent, param[4], state$4);
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
