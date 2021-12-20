

import * as Index$OrillusionComponentTypePbrmaterialWorker from "../../../../../node_modules/orillusion-component-type-pbrmaterial-worker/lib/es6_global/index.bs.js";
import * as DefaultGetDataUtils$OrillusionComponentWorkerUtils from "../../../../../node_modules/orillusion-component-worker-utils/lib/es6_global/src/DefaultGetDataUtils.bs.js";
import * as CreateStateUtils$OrillusionComponentPbrmaterialWorker from "./create_state/CreateStateUtils.bs.js";
import * as GetPBRMaterialDataUtils$OrillusionComponentPbrmaterialWorker from "./operate_data/GetPBRMaterialDataUtils.bs.js";

function getData(param) {
  return {
          componentName: Index$OrillusionComponentTypePbrmaterialWorker.componentName,
          createStateFunc: (function (param) {
              return CreateStateUtils$OrillusionComponentPbrmaterialWorker.createState(param.isDebug, param.pbrMaterialCount, param.buffer);
            }),
          getGameObjectsFunc: DefaultGetDataUtils$OrillusionComponentWorkerUtils.getGameObjectsFunc,
          createComponentFunc: DefaultGetDataUtils$OrillusionComponentWorkerUtils.createComponentFunc,
          addComponentFunc: DefaultGetDataUtils$OrillusionComponentWorkerUtils.addComponentFunc,
          hasComponentFunc: DefaultGetDataUtils$OrillusionComponentWorkerUtils.hasComponentFunc,
          getComponentFunc: DefaultGetDataUtils$OrillusionComponentWorkerUtils.getComponentFunc,
          getComponentDataFunc: (function (state, component, dataName) {
              return GetPBRMaterialDataUtils$OrillusionComponentPbrmaterialWorker.getData(state, component, dataName);
            }),
          setComponentDataFunc: DefaultGetDataUtils$OrillusionComponentWorkerUtils.setComponentDataFunc,
          getAllComponentsFunc: DefaultGetDataUtils$OrillusionComponentWorkerUtils.getAllComponentsFunc
        };
}

export {
  getData ,
  
}
/* No side effect */
