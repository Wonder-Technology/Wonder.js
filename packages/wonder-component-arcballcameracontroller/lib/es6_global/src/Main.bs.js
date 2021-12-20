

import * as Index$WonderComponentTypeArcballcameracontroller from "../../../../../node_modules/wonder-component-type-arcballcameracontroller/lib/es6_global/index.bs.js";
import * as CreateStateUtils$WonderComponentArcballcameracontroller from "./create_state/CreateStateUtils.bs.js";
import * as GetGameObjectsUtils$WonderComponentArcballcameracontroller from "./gameobject/GetGameObjectsUtils.bs.js";
import * as AddArcballCameraControllerUtils$WonderComponentArcballcameracontroller from "./gameobject/AddArcballCameraControllerUtils.bs.js";
import * as GetArcballCameraControllerUtils$WonderComponentArcballcameracontroller from "./gameobject/GetArcballCameraControllerUtils.bs.js";
import * as HasArcballCameraControllerUtils$WonderComponentArcballcameracontroller from "./gameobject/HasArcballCameraControllerUtils.bs.js";
import * as CreateArcballCameraControllerUtils$WonderComponentArcballcameracontroller from "./operate_component/CreateArcballCameraControllerUtils.bs.js";
import * as GetAllArcballCameraControllersUtils$WonderComponentArcballcameracontroller from "./operate_component/GetAllArcballCameraControllersUtils.bs.js";
import * as GetArcballCameraControllerDataUtils$WonderComponentArcballcameracontroller from "./operate_data/GetArcballCameraControllerDataUtils.bs.js";
import * as SetArcballCameraControllerDataUtils$WonderComponentArcballcameracontroller from "./operate_data/SetArcballCameraControllerDataUtils.bs.js";

function getData(param) {
  return {
          componentName: Index$WonderComponentTypeArcballcameracontroller.componentName,
          createStateFunc: (function (param) {
              return CreateStateUtils$WonderComponentArcballcameracontroller.createState(param.isDebug);
            }),
          getGameObjectsFunc: GetGameObjectsUtils$WonderComponentArcballcameracontroller.get,
          createComponentFunc: CreateArcballCameraControllerUtils$WonderComponentArcballcameracontroller.create,
          addComponentFunc: AddArcballCameraControllerUtils$WonderComponentArcballcameracontroller.add,
          hasComponentFunc: HasArcballCameraControllerUtils$WonderComponentArcballcameracontroller.has,
          getComponentFunc: GetArcballCameraControllerUtils$WonderComponentArcballcameracontroller.get,
          getComponentDataFunc: (function (state, component, dataName) {
              return GetArcballCameraControllerDataUtils$WonderComponentArcballcameracontroller.getData(state, component, dataName);
            }),
          setComponentDataFunc: (function (state, component, dataName, dataValue) {
              return SetArcballCameraControllerDataUtils$WonderComponentArcballcameracontroller.setData(state, component, dataName, dataValue);
            }),
          getAllComponentsFunc: GetAllArcballCameraControllersUtils$WonderComponentArcballcameracontroller.getAll
        };
}

export {
  getData ,
  
}
/* No side effect */
