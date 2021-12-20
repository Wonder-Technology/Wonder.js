'use strict';

var Index$WonderComponentTypeBasiccameraview = require("wonder-component-type-basiccameraview/lib/js/index.bs.js");
var CreateStateUtils$WonderComponentBasiccameraview = require("./create_state/CreateStateUtils.bs.js");
var GetGameObjectsUtils$WonderComponentBasiccameraview = require("./gameobject/GetGameObjectsUtils.bs.js");
var AddBasicCameraViewUtils$WonderComponentBasiccameraview = require("./gameobject/AddBasicCameraViewUtils.bs.js");
var GetBasicCameraViewUtils$WonderComponentBasiccameraview = require("./gameobject/GetBasicCameraViewUtils.bs.js");
var HasBasicCameraViewUtils$WonderComponentBasiccameraview = require("./gameobject/HasBasicCameraViewUtils.bs.js");
var CreateBasicCameraViewUtils$WonderComponentBasiccameraview = require("./operate_component/CreateBasicCameraViewUtils.bs.js");
var GetAllBasicCameraViewsUtils$WonderComponentBasiccameraview = require("./operate_component/GetAllBasicCameraViewsUtils.bs.js");
var GetBasicCameraViewDataUtils$WonderComponentBasiccameraview = require("./operate_data/GetBasicCameraViewDataUtils.bs.js");
var SetBasicCameraViewDataUtils$WonderComponentBasiccameraview = require("./operate_data/SetBasicCameraViewDataUtils.bs.js");

function getData(param) {
  return {
          componentName: Index$WonderComponentTypeBasiccameraview.componentName,
          createStateFunc: (function (param) {
              return CreateStateUtils$WonderComponentBasiccameraview.createState(param.isDebug);
            }),
          getGameObjectsFunc: GetGameObjectsUtils$WonderComponentBasiccameraview.get,
          createComponentFunc: CreateBasicCameraViewUtils$WonderComponentBasiccameraview.create,
          addComponentFunc: AddBasicCameraViewUtils$WonderComponentBasiccameraview.add,
          hasComponentFunc: HasBasicCameraViewUtils$WonderComponentBasiccameraview.has,
          getComponentFunc: GetBasicCameraViewUtils$WonderComponentBasiccameraview.get,
          getComponentDataFunc: (function (state, component, dataName) {
              return GetBasicCameraViewDataUtils$WonderComponentBasiccameraview.getData(state, component, dataName);
            }),
          setComponentDataFunc: (function (state, component, dataName, dataValue) {
              return SetBasicCameraViewDataUtils$WonderComponentBasiccameraview.setData(state, component, dataName, dataValue);
            }),
          getAllComponentsFunc: GetAllBasicCameraViewsUtils$WonderComponentBasiccameraview.getAll
        };
}

exports.getData = getData;
/* No side effect */
