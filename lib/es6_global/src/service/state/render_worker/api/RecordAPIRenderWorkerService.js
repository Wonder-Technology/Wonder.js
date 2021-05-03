

import * as Caml_array from "./../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as ExtendIMGUIRenderWorkerService$Wonderjs from "../imgui/ExtendIMGUIRenderWorkerService.js";
import * as ManageIMGUIRenderWorkerService$Wonderjs from "../imgui/ManageIMGUIRenderWorkerService.js";
import * as OperateCustomRenderWorkerService$Wonderjs from "../custom/OperateCustomRenderWorkerService.js";
import * as FixedLayoutControlIMGUIRenderWorkerService$Wonderjs from "../imgui/FixedLayoutControlIMGUIRenderWorkerService.js";

function getIMGUIAPIJsObj(state) {
  return state[/* apiRecord */30][/* imguiAPIJsObj */0];
}

function setIMGUIAPIJsObj(imguiAPIJsObj, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* apiRecord */30] = imguiAPIJsObj;
  return newrecord;
}

function create(param) {
  return /* record */[/* imguiAPIJsObj */{
            label: FixedLayoutControlIMGUIRenderWorkerService$Wonderjs.label,
            image: FixedLayoutControlIMGUIRenderWorkerService$Wonderjs.image,
            button: ExtendIMGUIRenderWorkerService$Wonderjs.Button[/* button */0],
            box: FixedLayoutControlIMGUIRenderWorkerService$Wonderjs.box,
            beginGroup: FixedLayoutControlIMGUIRenderWorkerService$Wonderjs.beginGroup,
            endGroup: FixedLayoutControlIMGUIRenderWorkerService$Wonderjs.endGroup,
            unsafeGetCustomControl: ExtendIMGUIRenderWorkerService$Wonderjs.Extend[/* unsafeGetCustomControl */0],
            getWonderImguiIMGUIRecord: ManageIMGUIRenderWorkerService$Wonderjs.getRecord,
            setWonderImguiIMGUIRecord: ManageIMGUIRenderWorkerService$Wonderjs.setRecord,
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
/* ExtendIMGUIRenderWorkerService-Wonderjs Not a pure module */
