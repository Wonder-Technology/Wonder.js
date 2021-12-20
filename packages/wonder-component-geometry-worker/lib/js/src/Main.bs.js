'use strict';

var Index$OrillusionComponentTypeGeometryWorker = require("orillusion-component-type-geometry-worker/lib/js/index.bs.js");
var CreateStateUtils$OrillusionComponentGeometryWorker = require("./create_state/CreateStateUtils.bs.js");
var DefaultGetDataUtils$OrillusionComponentWorkerUtils = require("orillusion-component-worker-utils/lib/js/src/DefaultGetDataUtils.bs.js");
var GetGeometryDataUtils$OrillusionComponentGeometryWorker = require("./operate_data/GetGeometryDataUtils.bs.js");

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

exports.getData = getData;
/* No side effect */
