

import * as CloneLightService$Wonderjs from "../CloneLightService.js";
import * as CreateDirectionLightService$Wonderjs from "./CreateDirectionLightService.js";
import * as OperateDirectionLightService$Wonderjs from "./OperateDirectionLightService.js";

function _getData(sourceComponent, record) {
  return /* tuple */[
          OperateDirectionLightService$Wonderjs.getColor(sourceComponent, record),
          OperateDirectionLightService$Wonderjs.getIntensity(sourceComponent, record)
        ];
}

function _setData(sourceComponent, param, record) {
  return OperateDirectionLightService$Wonderjs.setIntensity(sourceComponent, param[1], OperateDirectionLightService$Wonderjs.setColor(sourceComponent, param[0], record));
}

function handleCloneComponent(sourceComponent, countRangeArr, record) {
  return CloneLightService$Wonderjs.handleCloneComponent(sourceComponent, countRangeArr, /* tuple */[
              (function (param) {
                  return CreateDirectionLightService$Wonderjs.create(true, param);
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
