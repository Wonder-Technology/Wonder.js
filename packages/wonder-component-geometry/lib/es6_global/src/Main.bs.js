

import * as Index$WonderComponentTypeGeometry from "../../../../../node_modules/wonder-component-type-geometry/lib/es6_global/index.bs.js";
import * as AddGeometryUtils$WonderComponentGeometry from "./gameobject/AddGeometryUtils.bs.js";
import * as CreateStateUtils$WonderComponentGeometry from "./create_state/CreateStateUtils.bs.js";
import * as GetGeometryUtils$WonderComponentGeometry from "./gameobject/GetGeometryUtils.bs.js";
import * as HasGeometryUtils$WonderComponentGeometry from "./gameobject/HasGeometryUtils.bs.js";
import * as CreateGeometryUtils$WonderComponentGeometry from "./operate_component/CreateGeometryUtils.bs.js";
import * as GetGameObjectsUtils$WonderComponentGeometry from "./gameobject/GetGameObjectsUtils.bs.js";
import * as GetAllGeometrysUtils$WonderComponentGeometry from "./operate_component/GetAllGeometrysUtils.bs.js";
import * as GetGeometryDataUtils$WonderComponentGeometry from "./operate_data/GetGeometryDataUtils.bs.js";
import * as SetGeometryDataUtils$WonderComponentGeometry from "./operate_data/SetGeometryDataUtils.bs.js";

function getData(param) {
  return {
          componentName: Index$WonderComponentTypeGeometry.componentName,
          createStateFunc: (function (param) {
              return CreateStateUtils$WonderComponentGeometry.createState(param.isDebug, param.geometryPointCount, param.geometryCount);
            }),
          getGameObjectsFunc: GetGameObjectsUtils$WonderComponentGeometry.get,
          createComponentFunc: CreateGeometryUtils$WonderComponentGeometry.create,
          addComponentFunc: AddGeometryUtils$WonderComponentGeometry.add,
          hasComponentFunc: HasGeometryUtils$WonderComponentGeometry.has,
          getComponentFunc: GetGeometryUtils$WonderComponentGeometry.get,
          getComponentDataFunc: (function (state, component, dataName) {
              return GetGeometryDataUtils$WonderComponentGeometry.getData(state, component, dataName);
            }),
          setComponentDataFunc: (function (state, component, dataName, dataValue) {
              return SetGeometryDataUtils$WonderComponentGeometry.setData(state, component, dataName, dataValue);
            }),
          getAllComponentsFunc: GetAllGeometrysUtils$WonderComponentGeometry.getAll
        };
}

export {
  getData ,
  
}
/* No side effect */
