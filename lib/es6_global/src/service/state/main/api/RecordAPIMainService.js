

import * as Caml_array from "../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as TransformAPI$Wonderjs from "../../../../api/TransformAPI.js";
import * as GameObjectAPI$Wonderjs from "../../../../api/GameObjectAPI.js";
import * as LightMaterialAPI$Wonderjs from "../../../../api/material/LightMaterialAPI.js";
import * as OperateWorkerDataMainService$Wonderjs from "../workerData/OperateWorkerDataMainService.js";
import * as FixedLayoutControlIMGUIMainService$Wonderjs from "../imgui/FixedLayoutControlIMGUIMainService.js";

function getAPIJsObj(state) {
  return state[/* apiRecord */43][/* apiJsObj */0];
}

function setAPIJsObj(apiJsObj, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* apiRecord */43] = apiJsObj;
  return newrecord;
}

function create() {
  return /* record */[/* apiJsObj */{
            label: FixedLayoutControlIMGUIMainService$Wonderjs.label,
            image: FixedLayoutControlIMGUIMainService$Wonderjs.image,
            button: FixedLayoutControlIMGUIMainService$Wonderjs.button,
            box: FixedLayoutControlIMGUIMainService$Wonderjs.box,
            radioButton: FixedLayoutControlIMGUIMainService$Wonderjs.radioButton,
            checkbox: FixedLayoutControlIMGUIMainService$Wonderjs.checkbox,
            sliderInt: FixedLayoutControlIMGUIMainService$Wonderjs.sliderInt,
            sliderFloat: FixedLayoutControlIMGUIMainService$Wonderjs.sliderFloat,
            beginGroup: FixedLayoutControlIMGUIMainService$Wonderjs.beginGroup,
            endGroup: FixedLayoutControlIMGUIMainService$Wonderjs.endGroup,
            unsafeGetGameObjectTransformComponent: GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent,
            unsafeGetGameObjectLightMaterialComponent: GameObjectAPI$Wonderjs.unsafeGetGameObjectLightMaterialComponent,
            setLightMaterialDiffuseColor: LightMaterialAPI$Wonderjs.setLightMaterialDiffuseColor,
            getLightMaterialSpecularColor: LightMaterialAPI$Wonderjs.getLightMaterialSpecularColor,
            setLightMaterialSpecularColor: LightMaterialAPI$Wonderjs.setLightMaterialSpecularColor,
            getLightMaterialShininess: LightMaterialAPI$Wonderjs.getLightMaterialShininess,
            setLightMaterialShininess: LightMaterialAPI$Wonderjs.setLightMaterialShininess,
            getTransformLocalPosition: TransformAPI$Wonderjs.getTransformLocalPosition,
            setTransformLocalPosition: TransformAPI$Wonderjs.setTransformLocalPosition,
            getRenderWorkerCustomData: OperateWorkerDataMainService$Wonderjs.getRenderWorkerCustomData
          }];
}

export {
  getAPIJsObj ,
  setAPIJsObj ,
  create ,
  
}
/* TransformAPI-Wonderjs Not a pure module */
