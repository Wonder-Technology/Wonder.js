

import * as Caml_array from "../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as ManageIMGUIAPI$WonderImgui from "../../../../../../node_modules/wonder-imgui/lib/es6_global/src/api/ManageIMGUIAPI.js";
import * as IOIMGUIMainService$Wonderjs from "../../../service/state/main/imgui/IOIMGUIMainService.js";
import * as DeviceManagerService$Wonderjs from "../../../service/record/all/device/DeviceManagerService.js";
import * as ManageIMGUIMainService$Wonderjs from "../../../service/state/main/imgui/ManageIMGUIMainService.js";
import * as RecordIMGUIMainService$Wonderjs from "../../../service/state/main/imgui/RecordIMGUIMainService.js";

function execJob(param, state) {
  var imguiRecord = state[/* imguiRecord */42];
  var gl = DeviceManagerService$Wonderjs.unsafeGetGl(state[/* deviceManagerRecord */9]);
  var state$1 = IOIMGUIMainService$Wonderjs.bindEvent(state);
  var newrecord = Caml_array.caml_array_dup(state$1);
  newrecord[/* imguiRecord */42] = /* record */[
    /* ioData */imguiRecord[/* ioData */0],
    /* isSetIMGUIFuncInRenderWorkerForWorker */imguiRecord[/* isSetIMGUIFuncInRenderWorkerForWorker */1],
    /* wonderImguiIMGUIRecord */ManageIMGUIAPI$WonderImgui.init(gl, ManageIMGUIMainService$Wonderjs.getCanvasSize(state$1), RecordIMGUIMainService$Wonderjs.getWonderIMGUIRecord(state$1))
  ];
  return newrecord;
}

export {
  execJob ,
  
}
/* ManageIMGUIAPI-WonderImgui Not a pure module */
