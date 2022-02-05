'use strict';

var Index$WonderComponentTypeArcballcameracontroller = require("wonder-component-type-arcballcameracontroller/lib/js/index.bs.js");
var CreateStateUtils$WonderComponentArcballcameracontroller = require("./create_state/CreateStateUtils.bs.js");
var GetGameObjectsUtils$WonderComponentArcballcameracontroller = require("./gameobject/GetGameObjectsUtils.bs.js");
var AddArcballCameraControllerUtils$WonderComponentArcballcameracontroller = require("./gameobject/AddArcballCameraControllerUtils.bs.js");
var GetArcballCameraControllerUtils$WonderComponentArcballcameracontroller = require("./gameobject/GetArcballCameraControllerUtils.bs.js");
var HasArcballCameraControllerUtils$WonderComponentArcballcameracontroller = require("./gameobject/HasArcballCameraControllerUtils.bs.js");
var CreateArcballCameraControllerUtils$WonderComponentArcballcameracontroller = require("./operate_component/CreateArcballCameraControllerUtils.bs.js");
var GetAllArcballCameraControllersUtils$WonderComponentArcballcameracontroller = require("./operate_component/GetAllArcballCameraControllersUtils.bs.js");
var GetArcballCameraControllerDataUtils$WonderComponentArcballcameracontroller = require("./operate_data/GetArcballCameraControllerDataUtils.bs.js");
var SetArcballCameraControllerDataUtils$WonderComponentArcballcameracontroller = require("./operate_data/SetArcballCameraControllerDataUtils.bs.js");

function getData(param) {
  return {
          componentName: Index$WonderComponentTypeArcballcameracontroller.componentName,
          createStateFunc: (function (param) {
              return CreateStateUtils$WonderComponentArcballcameracontroller.createState(param.isDebug);
            }),
          getGameObjectsFunc: GetGameObjectsUtils$WonderComponentArcballcameracontroller.get,
          createComponentFunc: CreateArcballCameraControllerUtils$WonderComponentArcballcameracontroller.create,
          addComponentFunc: AddArcballCameraControllerUtils$WonderComponentArcballcameracontroller.add,
          hasComponentFunc: HasArcballCameraControllerUtils$WonderComponentArcballcameracontroller.has,
          getComponentFunc: GetArcballCameraControllerUtils$WonderComponentArcballcameracontroller.get,
          getComponentDataFunc: (function (state, component, dataName) {
              return GetArcballCameraControllerDataUtils$WonderComponentArcballcameracontroller.getData(state, component, dataName);
            }),
          setComponentDataFunc: (function (state, component, dataName, dataValue) {
              return SetArcballCameraControllerDataUtils$WonderComponentArcballcameracontroller.setData(state, component, dataName, dataValue);
            }),
          getAllComponentsFunc: GetAllArcballCameraControllersUtils$WonderComponentArcballcameracontroller.getAll
        };
}

exports.getData = getData;
/* No side effect */
