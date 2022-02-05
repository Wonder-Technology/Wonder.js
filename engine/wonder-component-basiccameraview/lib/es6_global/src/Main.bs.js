

import * as Index$WonderComponentTypeBasiccameraview from "../../../../../node_modules/wonder-component-type-basiccameraview/lib/es6_global/index.bs.js";
import * as CreateStateUtils$WonderComponentBasiccameraview from "./create_state/CreateStateUtils.bs.js";
import * as GetGameObjectsUtils$WonderComponentBasiccameraview from "./gameobject/GetGameObjectsUtils.bs.js";
import * as AddBasicCameraViewUtils$WonderComponentBasiccameraview from "./gameobject/AddBasicCameraViewUtils.bs.js";
import * as GetBasicCameraViewUtils$WonderComponentBasiccameraview from "./gameobject/GetBasicCameraViewUtils.bs.js";
import * as HasBasicCameraViewUtils$WonderComponentBasiccameraview from "./gameobject/HasBasicCameraViewUtils.bs.js";
import * as CreateBasicCameraViewUtils$WonderComponentBasiccameraview from "./operate_component/CreateBasicCameraViewUtils.bs.js";
import * as GetAllBasicCameraViewsUtils$WonderComponentBasiccameraview from "./operate_component/GetAllBasicCameraViewsUtils.bs.js";
import * as GetBasicCameraViewDataUtils$WonderComponentBasiccameraview from "./operate_data/GetBasicCameraViewDataUtils.bs.js";
import * as SetBasicCameraViewDataUtils$WonderComponentBasiccameraview from "./operate_data/SetBasicCameraViewDataUtils.bs.js";

function getData(param) {
  return {
          componentName: Index$WonderComponentTypeBasiccameraview.componentName,
          createStateFunc: (function (param) {
              return CreateStateUtils$WonderComponentBasiccameraview.createState(param.isDebug);
            }),
          getGameObjectsFunc: GetGameObjectsUtils$WonderComponentBasiccameraview.get,
          createComponentFunc: CreateBasicCameraViewUtils$WonderComponentBasiccameraview.create,
          addComponentFunc: AddBasicCameraViewUtils$WonderComponentBasiccameraview.add,
          hasComponentFunc: HasBasicCameraViewUtils$WonderComponentBasiccameraview.has,
          getComponentFunc: GetBasicCameraViewUtils$WonderComponentBasiccameraview.get,
          getComponentDataFunc: (function (state, component, dataName) {
              return GetBasicCameraViewDataUtils$WonderComponentBasiccameraview.getData(state, component, dataName);
            }),
          setComponentDataFunc: (function (state, component, dataName, dataValue) {
              return SetBasicCameraViewDataUtils$WonderComponentBasiccameraview.setData(state, component, dataName, dataValue);
            }),
          getAllComponentsFunc: GetAllBasicCameraViewsUtils$WonderComponentBasiccameraview.getAll
        };
}

export {
  getData ,
  
}
/* No side effect */
