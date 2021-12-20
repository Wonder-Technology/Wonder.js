'use strict';

var Index$WonderComponentTypePbrmaterial = require("wonder-component-type-pbrmaterial/lib/js/index.bs.js");
var CreateStateUtils$WonderComponentPbrmaterial = require("./create_state/CreateStateUtils.bs.js");
var AddPBRMaterialUtils$WonderComponentPbrmaterial = require("./gameobject/AddPBRMaterialUtils.bs.js");
var GetGameObjectsUtils$WonderComponentPbrmaterial = require("./gameobject/GetGameObjectsUtils.bs.js");
var GetPBRMaterialUtils$WonderComponentPbrmaterial = require("./gameobject/GetPBRMaterialUtils.bs.js");
var HasPBRMaterialUtils$WonderComponentPbrmaterial = require("./gameobject/HasPBRMaterialUtils.bs.js");
var CreatePBRMaterialUtils$WonderComponentPbrmaterial = require("./operate_component/CreatePBRMaterialUtils.bs.js");
var GetAllPBRMaterialsUtils$WonderComponentPbrmaterial = require("./operate_component/GetAllPBRMaterialsUtils.bs.js");
var GetPBRMaterialDataUtils$WonderComponentPbrmaterial = require("./operate_data/GetPBRMaterialDataUtils.bs.js");
var SetPBRMaterialDataUtils$WonderComponentPbrmaterial = require("./operate_data/SetPBRMaterialDataUtils.bs.js");

function getData(param) {
  return {
          componentName: Index$WonderComponentTypePbrmaterial.componentName,
          createStateFunc: (function (param) {
              return CreateStateUtils$WonderComponentPbrmaterial.createState(param.isDebug, param.pbrMaterialCount);
            }),
          getGameObjectsFunc: GetGameObjectsUtils$WonderComponentPbrmaterial.get,
          createComponentFunc: CreatePBRMaterialUtils$WonderComponentPbrmaterial.create,
          addComponentFunc: AddPBRMaterialUtils$WonderComponentPbrmaterial.add,
          hasComponentFunc: HasPBRMaterialUtils$WonderComponentPbrmaterial.has,
          getComponentFunc: GetPBRMaterialUtils$WonderComponentPbrmaterial.get,
          getComponentDataFunc: (function (state, component, dataName) {
              return GetPBRMaterialDataUtils$WonderComponentPbrmaterial.getData(state, component, dataName);
            }),
          setComponentDataFunc: (function (state, component, dataName, dataValue) {
              return SetPBRMaterialDataUtils$WonderComponentPbrmaterial.setData(state, component, dataName, dataValue);
            }),
          getAllComponentsFunc: GetAllPBRMaterialsUtils$WonderComponentPbrmaterial.getAll
        };
}

exports.getData = getData;
/* No side effect */
