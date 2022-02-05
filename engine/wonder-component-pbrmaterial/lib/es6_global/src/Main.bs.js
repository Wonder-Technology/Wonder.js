

import * as Index$WonderComponentTypePbrmaterial from "../../../../../node_modules/wonder-component-type-pbrmaterial/lib/es6_global/index.bs.js";
import * as CreateStateUtils$WonderComponentPbrmaterial from "./create_state/CreateStateUtils.bs.js";
import * as AddPBRMaterialUtils$WonderComponentPbrmaterial from "./gameobject/AddPBRMaterialUtils.bs.js";
import * as GetGameObjectsUtils$WonderComponentPbrmaterial from "./gameobject/GetGameObjectsUtils.bs.js";
import * as GetPBRMaterialUtils$WonderComponentPbrmaterial from "./gameobject/GetPBRMaterialUtils.bs.js";
import * as HasPBRMaterialUtils$WonderComponentPbrmaterial from "./gameobject/HasPBRMaterialUtils.bs.js";
import * as CreatePBRMaterialUtils$WonderComponentPbrmaterial from "./operate_component/CreatePBRMaterialUtils.bs.js";
import * as GetAllPBRMaterialsUtils$WonderComponentPbrmaterial from "./operate_component/GetAllPBRMaterialsUtils.bs.js";
import * as GetPBRMaterialDataUtils$WonderComponentPbrmaterial from "./operate_data/GetPBRMaterialDataUtils.bs.js";
import * as SetPBRMaterialDataUtils$WonderComponentPbrmaterial from "./operate_data/SetPBRMaterialDataUtils.bs.js";

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

export {
  getData ,
  
}
/* No side effect */
