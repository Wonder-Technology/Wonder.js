

import * as Index$OrillusionComponentTypeTransformWorker from "../../../../../node_modules/orillusion-component-type-transform-worker/lib/es6_global/index.bs.js";
import * as DefaultGetDataUtils$OrillusionComponentWorkerUtils from "../../../../../node_modules/orillusion-component-worker-utils/lib/es6_global/src/DefaultGetDataUtils.bs.js";
import * as CreateStateUtils$OrillusionComponentTransformWorker from "./create_state/CreateStateUtils.bs.js";
import * as GetTransformDataUtils$OrillusionComponentTransformWorker from "./operate_data/GetTransformDataUtils.bs.js";

function getData(param) {
  return {
          componentName: Index$OrillusionComponentTypeTransformWorker.componentName,
          createStateFunc: (function (param) {
              return CreateStateUtils$OrillusionComponentTransformWorker.createState(param.isDebug, param.transformCount, param.buffer);
            }),
          getGameObjectsFunc: DefaultGetDataUtils$OrillusionComponentWorkerUtils.getGameObjectsFunc,
          createComponentFunc: DefaultGetDataUtils$OrillusionComponentWorkerUtils.createComponentFunc,
          addComponentFunc: DefaultGetDataUtils$OrillusionComponentWorkerUtils.addComponentFunc,
          hasComponentFunc: DefaultGetDataUtils$OrillusionComponentWorkerUtils.hasComponentFunc,
          getComponentFunc: DefaultGetDataUtils$OrillusionComponentWorkerUtils.getComponentFunc,
          getComponentDataFunc: (function (state, component, dataName) {
              return GetTransformDataUtils$OrillusionComponentTransformWorker.getData(state, component, dataName);
            }),
          setComponentDataFunc: DefaultGetDataUtils$OrillusionComponentWorkerUtils.setComponentDataFunc,
          getAllComponentsFunc: DefaultGetDataUtils$OrillusionComponentWorkerUtils.getAllComponentsFunc
        };
}

export {
  getData ,
  
}
/* No side effect */
