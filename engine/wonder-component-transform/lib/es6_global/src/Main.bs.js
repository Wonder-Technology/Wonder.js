

import * as Index$WonderComponentTypeTransform from "../../../../../node_modules/wonder-component-type-transform/lib/es6_global/index.bs.js";
import * as CreateStateUtils$WonderComponentTransform from "./create_state/CreateStateUtils.bs.js";
import * as AddTransformUtils$WonderComponentTransform from "./gameobject/AddTransformUtils.bs.js";
import * as GetTransformUtils$WonderComponentTransform from "./gameobject/GetTransformUtils.bs.js";
import * as HasTransformUtils$WonderComponentTransform from "./gameobject/HasTransformUtils.bs.js";
import * as GetGameObjectsUtils$WonderComponentTransform from "./gameobject/GetGameObjectsUtils.bs.js";
import * as CreateTransformUtils$WonderComponentTransform from "./operate_component/CreateTransformUtils.bs.js";
import * as GetAllTransformsUtils$WonderComponentTransform from "./operate_component/GetAllTransformsUtils.bs.js";
import * as GetTransformDataUtils$WonderComponentTransform from "./operate_data/GetTransformDataUtils.bs.js";
import * as SetTransformDataUtils$WonderComponentTransform from "./operate_data/SetTransformDataUtils.bs.js";

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

export {
  getData ,
  
}
/* No side effect */
