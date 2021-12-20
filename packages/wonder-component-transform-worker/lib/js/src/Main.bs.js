'use strict';

var Index$OrillusionComponentTypeTransformWorker = require("orillusion-component-type-transform-worker/lib/js/index.bs.js");
var DefaultGetDataUtils$OrillusionComponentWorkerUtils = require("orillusion-component-worker-utils/lib/js/src/DefaultGetDataUtils.bs.js");
var CreateStateUtils$OrillusionComponentTransformWorker = require("./create_state/CreateStateUtils.bs.js");
var GetTransformDataUtils$OrillusionComponentTransformWorker = require("./operate_data/GetTransformDataUtils.bs.js");

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

exports.getData = getData;
/* No side effect */
