

import * as Caml_array from "../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as OperateCustomRenderWorkerService$Wonderjs from "../custom/OperateCustomRenderWorkerService.js";
import * as FixedLayoutControlIMGUIRenderWorkerService$Wonderjs from "../imgui/FixedLayoutControlIMGUIRenderWorkerService.js";

function getIMGUIAPIJsObj(state) {
  return state[/* apiRecord */28][/* imguiAPIJsObj */0];
}

function setIMGUIAPIJsObj(imguiAPIJsObj, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* apiRecord */28] = imguiAPIJsObj;
  return newrecord;
}

function create(param) {
  return /* record */[/* imguiAPIJsObj */{
            label: FixedLayoutControlIMGUIRenderWorkerService$Wonderjs.label,
            image: FixedLayoutControlIMGUIRenderWorkerService$Wonderjs.image,
            button: FixedLayoutControlIMGUIRenderWorkerService$Wonderjs.button,
            box: FixedLayoutControlIMGUIRenderWorkerService$Wonderjs.box,
            radioButton: FixedLayoutControlIMGUIRenderWorkerService$Wonderjs.radioButton,
            checkbox: FixedLayoutControlIMGUIRenderWorkerService$Wonderjs.checkbox,
            sliderInt: FixedLayoutControlIMGUIRenderWorkerService$Wonderjs.sliderInt,
            sliderFloat: FixedLayoutControlIMGUIRenderWorkerService$Wonderjs.sliderFloat,
            beginGroup: FixedLayoutControlIMGUIRenderWorkerService$Wonderjs.beginGroup,
            endGroup: FixedLayoutControlIMGUIRenderWorkerService$Wonderjs.endGroup,
            getCustomDataInRenderWorker: OperateCustomRenderWorkerService$Wonderjs.getCustomDataInRenderWorker,
            setCustomDataInRenderWorker: OperateCustomRenderWorkerService$Wonderjs.setCustomDataInRenderWorker,
            getCustomDataFromMainWorkerToRenderWorker: OperateCustomRenderWorkerService$Wonderjs.getCustomDataFromMainWorkerToRenderWorker,
            getCustomDataFromRenderWorkerToMainWorker: OperateCustomRenderWorkerService$Wonderjs.getCustomDataFromRenderWorkerToMainWorker,
            setCustomDataFromRenderWorkerToMainWorker: OperateCustomRenderWorkerService$Wonderjs.setCustomDataFromRenderWorkerToMainWorker
          }];
}

export {
  getIMGUIAPIJsObj ,
  setIMGUIAPIJsObj ,
  create ,
  
}
/* FixedLayoutControlIMGUIRenderWorkerService-Wonderjs Not a pure module */
