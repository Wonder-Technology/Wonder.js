'use strict';

var Index$OrillusionComponentTypeDirectionlightWorker = require("orillusion-component-type-directionlight-worker/lib/js/index.bs.js");
var DefaultGetDataUtils$OrillusionComponentWorkerUtils = require("orillusion-component-worker-utils/lib/js/src/DefaultGetDataUtils.bs.js");
var CreateStateUtils$OrillusionComponentDirectionlightWorker = require("./create_state/CreateStateUtils.bs.js");
var GetDirectionLightDataUtils$OrillusionComponentDirectionlightWorker = require("./operate_data/GetDirectionLightDataUtils.bs.js");

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

exports.getData = getData;
/* No side effect */
