'use strict';

var Index$WonderComponentTypeGeometry = require("wonder-component-type-geometry/lib/js/index.bs.js");
var AddGeometryUtils$WonderComponentGeometry = require("./gameobject/AddGeometryUtils.bs.js");
var CreateStateUtils$WonderComponentGeometry = require("./create_state/CreateStateUtils.bs.js");
var GetGeometryUtils$WonderComponentGeometry = require("./gameobject/GetGeometryUtils.bs.js");
var HasGeometryUtils$WonderComponentGeometry = require("./gameobject/HasGeometryUtils.bs.js");
var CreateGeometryUtils$WonderComponentGeometry = require("./operate_component/CreateGeometryUtils.bs.js");
var GetGameObjectsUtils$WonderComponentGeometry = require("./gameobject/GetGameObjectsUtils.bs.js");
var GetAllGeometrysUtils$WonderComponentGeometry = require("./operate_component/GetAllGeometrysUtils.bs.js");
var GetGeometryDataUtils$WonderComponentGeometry = require("./operate_data/GetGeometryDataUtils.bs.js");
var SetGeometryDataUtils$WonderComponentGeometry = require("./operate_data/SetGeometryDataUtils.bs.js");

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

exports.getData = getData;
/* No side effect */
