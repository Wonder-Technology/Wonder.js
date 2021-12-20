'use strict';

var Index$WonderComponentTypePerspectivecameraprojection = require("wonder-component-type-perspectivecameraprojection/lib/js/index.bs.js");
var CreateStateUtils$WonderComponentPerspectivecameraprojection = require("./create_state/CreateStateUtils.bs.js");
var GetGameObjectsUtils$WonderComponentPerspectivecameraprojection = require("./gameobject/GetGameObjectsUtils.bs.js");
var AddPerspectiveCameraProjectionUtils$WonderComponentPerspectivecameraprojection = require("./gameobject/AddPerspectiveCameraProjectionUtils.bs.js");
var GetPerspectiveCameraProjectionUtils$WonderComponentPerspectivecameraprojection = require("./gameobject/GetPerspectiveCameraProjectionUtils.bs.js");
var HasPerspectiveCameraProjectionUtils$WonderComponentPerspectivecameraprojection = require("./gameobject/HasPerspectiveCameraProjectionUtils.bs.js");
var CreatePerspectiveCameraProjectionUtils$WonderComponentPerspectivecameraprojection = require("./operate_component/CreatePerspectiveCameraProjectionUtils.bs.js");
var GetAllPerspectiveCameraProjectionsUtils$WonderComponentPerspectivecameraprojection = require("./operate_component/GetAllPerspectiveCameraProjectionsUtils.bs.js");
var GetPerspectiveCameraProjectionDataUtils$WonderComponentPerspectivecameraprojection = require("./operate_data/GetPerspectiveCameraProjectionDataUtils.bs.js");
var SetPerspectiveCameraProjectionDataUtils$WonderComponentPerspectivecameraprojection = require("./operate_data/SetPerspectiveCameraProjectionDataUtils.bs.js");

function getData(param) {
  return {
          componentName: Index$WonderComponentTypePerspectivecameraprojection.componentName,
          createStateFunc: (function (param) {
              return CreateStateUtils$WonderComponentPerspectivecameraprojection.createState(param.isDebug);
            }),
          getGameObjectsFunc: GetGameObjectsUtils$WonderComponentPerspectivecameraprojection.get,
          createComponentFunc: CreatePerspectiveCameraProjectionUtils$WonderComponentPerspectivecameraprojection.create,
          addComponentFunc: AddPerspectiveCameraProjectionUtils$WonderComponentPerspectivecameraprojection.add,
          hasComponentFunc: HasPerspectiveCameraProjectionUtils$WonderComponentPerspectivecameraprojection.has,
          getComponentFunc: GetPerspectiveCameraProjectionUtils$WonderComponentPerspectivecameraprojection.get,
          getComponentDataFunc: (function (state, component, dataName) {
              return GetPerspectiveCameraProjectionDataUtils$WonderComponentPerspectivecameraprojection.getData(state, component, dataName);
            }),
          setComponentDataFunc: (function (state, component, dataName, dataValue) {
              return SetPerspectiveCameraProjectionDataUtils$WonderComponentPerspectivecameraprojection.setData(state, component, dataName, dataValue);
            }),
          getAllComponentsFunc: GetAllPerspectiveCameraProjectionsUtils$WonderComponentPerspectivecameraprojection.getAll
        };
}

exports.getData = getData;
/* No side effect */
