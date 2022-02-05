'use strict';

var Index$WonderComponentTypeDirectionlight = require("wonder-component-type-directionlight/lib/js/index.bs.js");
var CreateStateUtils$WonderComponentDirectionlight = require("./create_state/CreateStateUtils.bs.js");
var GetGameObjectsUtils$WonderComponentDirectionlight = require("./gameobject/GetGameObjectsUtils.bs.js");
var AddDirectionLightUtils$WonderComponentDirectionlight = require("./gameobject/AddDirectionLightUtils.bs.js");
var GetDirectionLightUtils$WonderComponentDirectionlight = require("./gameobject/GetDirectionLightUtils.bs.js");
var HasDirectionLightUtils$WonderComponentDirectionlight = require("./gameobject/HasDirectionLightUtils.bs.js");
var CreateDirectionLightUtils$WonderComponentDirectionlight = require("./operate_component/CreateDirectionLightUtils.bs.js");
var GetAllDirectionLightsUtils$WonderComponentDirectionlight = require("./operate_component/GetAllDirectionLightsUtils.bs.js");
var GetDirectionLightDataUtils$WonderComponentDirectionlight = require("./operate_data/GetDirectionLightDataUtils.bs.js");
var SetDirectionLightDataUtils$WonderComponentDirectionlight = require("./operate_data/SetDirectionLightDataUtils.bs.js");

function getData(param) {
  return {
          componentName: Index$WonderComponentTypeDirectionlight.componentName,
          createStateFunc: (function (param) {
              return CreateStateUtils$WonderComponentDirectionlight.createState(param.isDebug, param.directionLightCount);
            }),
          getGameObjectsFunc: GetGameObjectsUtils$WonderComponentDirectionlight.get,
          createComponentFunc: CreateDirectionLightUtils$WonderComponentDirectionlight.create,
          addComponentFunc: AddDirectionLightUtils$WonderComponentDirectionlight.add,
          hasComponentFunc: HasDirectionLightUtils$WonderComponentDirectionlight.has,
          getComponentFunc: GetDirectionLightUtils$WonderComponentDirectionlight.get,
          getComponentDataFunc: (function (state, component, dataName) {
              return GetDirectionLightDataUtils$WonderComponentDirectionlight.getData(state, component, dataName);
            }),
          setComponentDataFunc: (function (state, component, dataName, dataValue) {
              return SetDirectionLightDataUtils$WonderComponentDirectionlight.setData(state, component, dataName, dataValue);
            }),
          getAllComponentsFunc: GetAllDirectionLightsUtils$WonderComponentDirectionlight.getAll
        };
}

exports.getData = getData;
/* No side effect */
