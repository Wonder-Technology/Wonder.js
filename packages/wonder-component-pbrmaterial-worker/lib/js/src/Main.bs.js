'use strict';

var Index$OrillusionComponentTypePbrmaterialWorker = require("orillusion-component-type-pbrmaterial-worker/lib/js/index.bs.js");
var DefaultGetDataUtils$OrillusionComponentWorkerUtils = require("orillusion-component-worker-utils/lib/js/src/DefaultGetDataUtils.bs.js");
var CreateStateUtils$OrillusionComponentPbrmaterialWorker = require("./create_state/CreateStateUtils.bs.js");
var GetPBRMaterialDataUtils$OrillusionComponentPbrmaterialWorker = require("./operate_data/GetPBRMaterialDataUtils.bs.js");

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

exports.getData = getData;
/* No side effect */
