

import * as CloneLightService$Wonderjs from "../CloneLightService.js";
import * as CreatePointLightService$Wonderjs from "./CreatePointLightService.js";
import * as OperatePointLightService$Wonderjs from "./OperatePointLightService.js";

function _getData(sourceComponent, record) {
  return /* tuple */[
          OperatePointLightService$Wonderjs.getColor(sourceComponent, record),
          OperatePointLightService$Wonderjs.getIntensity(sourceComponent, record),
          OperatePointLightService$Wonderjs.getConstant(sourceComponent, record),
          OperatePointLightService$Wonderjs.getLinear(sourceComponent, record),
          OperatePointLightService$Wonderjs.getQuadratic(sourceComponent, record),
          OperatePointLightService$Wonderjs.getRange(sourceComponent, record)
        ];
}

function _setData(sourceComponent, param, record) {
  return OperatePointLightService$Wonderjs.setRange(sourceComponent, param[5], OperatePointLightService$Wonderjs.setQuadratic(sourceComponent, param[4], OperatePointLightService$Wonderjs.setLinear(sourceComponent, param[3], OperatePointLightService$Wonderjs.setConstant(sourceComponent, param[2], OperatePointLightService$Wonderjs.setIntensity(sourceComponent, param[1], OperatePointLightService$Wonderjs.setColor(sourceComponent, param[0], record))))));
}

function handleCloneComponent(sourceComponent, countRangeArr, record) {
  return CloneLightService$Wonderjs.handleCloneComponent(sourceComponent, countRangeArr, /* tuple */[
              (function (param) {
                  return CreatePointLightService$Wonderjs.create(true, param);
                }),
              _getData,
              _setData
            ], record);
}

export {
  _getData ,
  _setData ,
  handleCloneComponent ,
  
}
/* CloneLightService-Wonderjs Not a pure module */
