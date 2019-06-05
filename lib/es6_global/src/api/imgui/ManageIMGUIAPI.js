

import * as Caml_array from "../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as ManageIMGUIAPI$WonderImgui from "../../../../../node_modules/wonder-imgui/lib/es6_global/src/api/ManageIMGUIAPI.js";
import * as ManageIMGUIMainService$Wonderjs from "../../service/state/main/imgui/ManageIMGUIMainService.js";
import * as RecordIMGUIMainService$Wonderjs from "../../service/state/main/imgui/RecordIMGUIMainService.js";

function getSetting(state) {
  return ManageIMGUIAPI$WonderImgui.getSetting(RecordIMGUIMainService$Wonderjs.getWonderIMGUIRecord(state));
}

function setSetting(setting, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  var init = state[/* imguiRecord */42];
  newrecord[/* imguiRecord */42] = /* record */[
    /* ioData */init[/* ioData */0],
    /* isSetIMGUIFuncInRenderWorkerForWorker */init[/* isSetIMGUIFuncInRenderWorkerForWorker */1],
    /* wonderImguiIMGUIRecord */ManageIMGUIAPI$WonderImgui.setSetting(setting, RecordIMGUIMainService$Wonderjs.getWonderIMGUIRecord(state))
  ];
  return newrecord;
}

var sendUniformProjectionMatData = ManageIMGUIMainService$Wonderjs.sendUniformProjectionMatData;

var setIMGUIFunc = ManageIMGUIMainService$Wonderjs.setIMGUIFunc;

var clearIMGUIFunc = ManageIMGUIMainService$Wonderjs.clearIMGUIFunc;

export {
  setIMGUIFunc ,
  clearIMGUIFunc ,
  getSetting ,
  setSetting ,
  sendUniformProjectionMatData ,
  
}
/* ManageIMGUIAPI-WonderImgui Not a pure module */
