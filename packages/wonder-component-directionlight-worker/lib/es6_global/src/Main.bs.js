

import * as Index$OrillusionComponentTypeDirectionlightWorker from "../../../../../node_modules/orillusion-component-type-directionlight-worker/lib/es6_global/index.bs.js";
import * as DefaultGetDataUtils$OrillusionComponentWorkerUtils from "../../../../../node_modules/orillusion-component-worker-utils/lib/es6_global/src/DefaultGetDataUtils.bs.js";
import * as CreateStateUtils$OrillusionComponentDirectionlightWorker from "./create_state/CreateStateUtils.bs.js";
import * as GetDirectionLightDataUtils$OrillusionComponentDirectionlightWorker from "./operate_data/GetDirectionLightDataUtils.bs.js";

function getData(param) {
  return {
          componentName: Index$OrillusionComponentTypeDirectionlightWorker.componentName,
          createStateFunc: (function (param) {
              return CreateStateUtils$OrillusionComponentDirectionlightWorker.createState(param.isDebug, param.directionLightCount, param.buffer);
            }),
          getGameObjectsFunc: DefaultGetDataUtils$OrillusionComponentWorkerUtils.getGameObjectsFunc,
          createComponentFunc: DefaultGetDataUtils$OrillusionComponentWorkerUtils.createComponentFunc,
          addComponentFunc: DefaultGetDataUtils$OrillusionComponentWorkerUtils.addComponentFunc,
          hasComponentFunc: DefaultGetDataUtils$OrillusionComponentWorkerUtils.hasComponentFunc,
          getComponentFunc: DefaultGetDataUtils$OrillusionComponentWorkerUtils.getComponentFunc,
          getComponentDataFunc: (function (state, component, dataName) {
              return GetDirectionLightDataUtils$OrillusionComponentDirectionlightWorker.getData(state, component, dataName);
            }),
          setComponentDataFunc: DefaultGetDataUtils$OrillusionComponentWorkerUtils.setComponentDataFunc,
          getAllComponentsFunc: DefaultGetDataUtils$OrillusionComponentWorkerUtils.getAllComponentsFunc
        };
}

export {
  getData ,
  
}
/* No side effect */
