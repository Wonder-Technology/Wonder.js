

import * as Index$WonderComponentTypePerspectivecameraprojection from "../../../../../node_modules/wonder-component-type-perspectivecameraprojection/lib/es6_global/index.bs.js";
import * as CreateStateUtils$WonderComponentPerspectivecameraprojection from "./create_state/CreateStateUtils.bs.js";
import * as GetGameObjectsUtils$WonderComponentPerspectivecameraprojection from "./gameobject/GetGameObjectsUtils.bs.js";
import * as AddPerspectiveCameraProjectionUtils$WonderComponentPerspectivecameraprojection from "./gameobject/AddPerspectiveCameraProjectionUtils.bs.js";
import * as GetPerspectiveCameraProjectionUtils$WonderComponentPerspectivecameraprojection from "./gameobject/GetPerspectiveCameraProjectionUtils.bs.js";
import * as HasPerspectiveCameraProjectionUtils$WonderComponentPerspectivecameraprojection from "./gameobject/HasPerspectiveCameraProjectionUtils.bs.js";
import * as CreatePerspectiveCameraProjectionUtils$WonderComponentPerspectivecameraprojection from "./operate_component/CreatePerspectiveCameraProjectionUtils.bs.js";
import * as GetAllPerspectiveCameraProjectionsUtils$WonderComponentPerspectivecameraprojection from "./operate_component/GetAllPerspectiveCameraProjectionsUtils.bs.js";
import * as GetPerspectiveCameraProjectionDataUtils$WonderComponentPerspectivecameraprojection from "./operate_data/GetPerspectiveCameraProjectionDataUtils.bs.js";
import * as SetPerspectiveCameraProjectionDataUtils$WonderComponentPerspectivecameraprojection from "./operate_data/SetPerspectiveCameraProjectionDataUtils.bs.js";

function getData(param) {
  return {
          componentName: Index$WonderComponentTypePerspectivecameraprojection.componentName,
          createStateFunc: (function (param) {
              return CreateStateUtils$WonderComponentPerspectivecameraprojection.createState(param.isDebug);
            }),
          getGameObjectsFunc: GetGameObjectsUtils$WonderComponentPerspectivecameraprojection.get,
          createComponentFunc: CreatePerspectiveCameraProjectionUtils$WonderComponentPerspectivecameraprojection.create,
          addComponentFunc: AddPerspectiveCameraProjectionUtils$WonderComponentPerspectivecameraprojection.add,
          hasComponentFunc: HasPerspectiveCameraProjectionUtils$WonderComponentPerspectivecameraprojection.has,
          getComponentFunc: GetPerspectiveCameraProjectionUtils$WonderComponentPerspectivecameraprojection.get,
          getComponentDataFunc: (function (state, component, dataName) {
              return GetPerspectiveCameraProjectionDataUtils$WonderComponentPerspectivecameraprojection.getData(state, component, dataName);
            }),
          setComponentDataFunc: (function (state, component, dataName, dataValue) {
              return SetPerspectiveCameraProjectionDataUtils$WonderComponentPerspectivecameraprojection.setData(state, component, dataName, dataValue);
            }),
          getAllComponentsFunc: GetAllPerspectiveCameraProjectionsUtils$WonderComponentPerspectivecameraprojection.getAll
        };
}

export {
  getData ,
  
}
/* No side effect */
