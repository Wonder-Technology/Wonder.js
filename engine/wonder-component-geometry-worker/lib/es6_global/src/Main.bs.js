

import * as Index$OrillusionComponentTypeGeometryWorker from "../../../../../node_modules/orillusion-component-type-geometry-worker/lib/es6_global/index.bs.js";
import * as CreateStateUtils$OrillusionComponentGeometryWorker from "./create_state/CreateStateUtils.bs.js";
import * as DefaultGetDataUtils$OrillusionComponentWorkerUtils from "../../../../../node_modules/orillusion-component-worker-utils/lib/es6_global/src/DefaultGetDataUtils.bs.js";
import * as GetGeometryDataUtils$OrillusionComponentGeometryWorker from "./operate_data/GetGeometryDataUtils.bs.js";

function getData(param) {
  return {
          componentName: Index$OrillusionComponentTypeGeometryWorker.componentName,
          createStateFunc: (function (param) {
              return CreateStateUtils$OrillusionComponentGeometryWorker.createState(param.isDebug, param.geometryPointCount, param.geometryCount, param.buffer);
            }),
          getGameObjectsFunc: DefaultGetDataUtils$OrillusionComponentWorkerUtils.getGameObjectsFunc,
          createComponentFunc: DefaultGetDataUtils$OrillusionComponentWorkerUtils.createComponentFunc,
          addComponentFunc: DefaultGetDataUtils$OrillusionComponentWorkerUtils.addComponentFunc,
          hasComponentFunc: DefaultGetDataUtils$OrillusionComponentWorkerUtils.hasComponentFunc,
          getComponentFunc: DefaultGetDataUtils$OrillusionComponentWorkerUtils.getComponentFunc,
          getComponentDataFunc: (function (state, component, dataName) {
              return GetGeometryDataUtils$OrillusionComponentGeometryWorker.getData(state, component, dataName);
            }),
          setComponentDataFunc: DefaultGetDataUtils$OrillusionComponentWorkerUtils.setComponentDataFunc,
          getAllComponentsFunc: DefaultGetDataUtils$OrillusionComponentWorkerUtils.getAllComponentsFunc
        };
}

export {
  getData ,
  
}
/* No side effect */
