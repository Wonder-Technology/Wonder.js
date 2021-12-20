'use strict';

var Index$WonderComponentTypeTransform = require("wonder-component-type-transform/lib/js/index.bs.js");
var CreateStateUtils$WonderComponentTransform = require("./create_state/CreateStateUtils.bs.js");
var AddTransformUtils$WonderComponentTransform = require("./gameobject/AddTransformUtils.bs.js");
var GetTransformUtils$WonderComponentTransform = require("./gameobject/GetTransformUtils.bs.js");
var HasTransformUtils$WonderComponentTransform = require("./gameobject/HasTransformUtils.bs.js");
var GetGameObjectsUtils$WonderComponentTransform = require("./gameobject/GetGameObjectsUtils.bs.js");
var CreateTransformUtils$WonderComponentTransform = require("./operate_component/CreateTransformUtils.bs.js");
var GetAllTransformsUtils$WonderComponentTransform = require("./operate_component/GetAllTransformsUtils.bs.js");
var GetTransformDataUtils$WonderComponentTransform = require("./operate_data/GetTransformDataUtils.bs.js");
var SetTransformDataUtils$WonderComponentTransform = require("./operate_data/SetTransformDataUtils.bs.js");

function getData(param) {
  return {
          componentName: Index$WonderComponentTypeTransform.componentName,
          createStateFunc: (function (param) {
              return CreateStateUtils$WonderComponentTransform.createState(param.isDebug, param.transformCount, param.float9Array1, param.float32Array1);
            }),
          getGameObjectsFunc: GetGameObjectsUtils$WonderComponentTransform.get,
          createComponentFunc: CreateTransformUtils$WonderComponentTransform.create,
          addComponentFunc: AddTransformUtils$WonderComponentTransform.add,
          hasComponentFunc: HasTransformUtils$WonderComponentTransform.has,
          getComponentFunc: GetTransformUtils$WonderComponentTransform.get,
          getComponentDataFunc: (function (state, component, dataName) {
              return GetTransformDataUtils$WonderComponentTransform.getData(state, component, dataName);
            }),
          setComponentDataFunc: (function (state, component, dataName, dataValue) {
              return SetTransformDataUtils$WonderComponentTransform.setData(state, component, dataName, dataValue);
            }),
          getAllComponentsFunc: GetAllTransformsUtils$WonderComponentTransform.getAll
        };
}

exports.getData = getData;
/* No side effect */
