

import * as Index$WonderComponentTypeDirectionlight from "../../../../../node_modules/wonder-component-type-directionlight/lib/es6_global/index.bs.js";
import * as CreateStateUtils$WonderComponentDirectionlight from "./create_state/CreateStateUtils.bs.js";
import * as GetGameObjectsUtils$WonderComponentDirectionlight from "./gameobject/GetGameObjectsUtils.bs.js";
import * as AddDirectionLightUtils$WonderComponentDirectionlight from "./gameobject/AddDirectionLightUtils.bs.js";
import * as GetDirectionLightUtils$WonderComponentDirectionlight from "./gameobject/GetDirectionLightUtils.bs.js";
import * as HasDirectionLightUtils$WonderComponentDirectionlight from "./gameobject/HasDirectionLightUtils.bs.js";
import * as CreateDirectionLightUtils$WonderComponentDirectionlight from "./operate_component/CreateDirectionLightUtils.bs.js";
import * as GetAllDirectionLightsUtils$WonderComponentDirectionlight from "./operate_component/GetAllDirectionLightsUtils.bs.js";
import * as GetDirectionLightDataUtils$WonderComponentDirectionlight from "./operate_data/GetDirectionLightDataUtils.bs.js";
import * as SetDirectionLightDataUtils$WonderComponentDirectionlight from "./operate_data/SetDirectionLightDataUtils.bs.js";

function getData(param) {
  return {
          componentName: Index$WonderComponentTypeDirectionlight.componentName,
          createStateFunc: (function (param) {
              return CreateStateUtils$WonderComponentDirectionlight.createState(param.isDebug, param.directionLightCount);
            }),
          getGameObjectsFunc: GetGameObjectsUtils$WonderComponentDirectionlight.get,
          createComponentFunc: CreateDirectionLightUtils$WonderComponentDirectionlight.create,
          addComponentFunc: AddDirectionLightUtils$WonderComponentDirectionlight.add,
          hasComponentFunc: HasDirectionLightUtils$WonderComponentDirectionlight.has,
          getComponentFunc: GetDirectionLightUtils$WonderComponentDirectionlight.get,
          getComponentDataFunc: (function (state, component, dataName) {
              return GetDirectionLightDataUtils$WonderComponentDirectionlight.getData(state, component, dataName);
            }),
          setComponentDataFunc: (function (state, component, dataName, dataValue) {
              return SetDirectionLightDataUtils$WonderComponentDirectionlight.setData(state, component, dataName, dataValue);
            }),
          getAllComponentsFunc: GetAllDirectionLightsUtils$WonderComponentDirectionlight.getAll
        };
}

export {
  getData ,
  
}
/* No side effect */
