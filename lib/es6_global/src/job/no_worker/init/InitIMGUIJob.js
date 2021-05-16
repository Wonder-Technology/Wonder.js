

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Caml_array from "../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as ManageIMGUIAPI$WonderImgui from "../../../../../../node_modules/wonder-imgui/lib/es6_global/src/api/ManageIMGUIAPI.js";
import * as IOIMGUIMainService$Wonderjs from "../../../service/state/main/imgui/IOIMGUIMainService.js";
import * as ExtendIMGUIMainService$Wonderjs from "../../../service/state/main/imgui/extend/ExtendIMGUIMainService.js";
import * as ManageIMGUIMainService$Wonderjs from "../../../service/state/main/imgui/ManageIMGUIMainService.js";
import * as RecordIMGUIMainService$Wonderjs from "../../../service/state/main/imgui/RecordIMGUIMainService.js";
import * as AllDeviceManagerService$Wonderjs from "../../../service/record/all/device/AllDeviceManagerService.js";

function execJob(param, state) {
  var imguiRecord = state[/* imguiRecord */44];
  var gl = AllDeviceManagerService$Wonderjs.unsafeGetGl(state[/* deviceManagerRecord */9]);
  var state$1 = IOIMGUIMainService$Wonderjs.bindEvent(state);
  var newrecord = Caml_array.caml_array_dup(state$1);
  return Curry._1(ExtendIMGUIMainService$Wonderjs.ExtendData[/* Skin */2][/* mergeAllSkinDataMapsToWonderImguiIMGUIRecord */9], Curry._1(ExtendIMGUIMainService$Wonderjs.ExtendData[/* CustomControl */1][/* registerAllCustomControlsToWonderImguiIMGUIRecord */4], (newrecord[/* imguiRecord */44] = /* record */[
                    /* ioData */imguiRecord[/* ioData */0],
                    /* isSetExecFuncInRenderWorkerForWorker */imguiRecord[/* isSetExecFuncInRenderWorkerForWorker */1],
                    /* extendData */imguiRecord[/* extendData */2],
                    /* wonderImguiIMGUIRecord */ManageIMGUIAPI$WonderImgui.init(gl, ManageIMGUIMainService$Wonderjs.getCanvasSize(state$1), RecordIMGUIMainService$Wonderjs.getWonderIMGUIRecord(state$1))
                  ], newrecord)));
}

export {
  execJob ,
  
}
/* ManageIMGUIAPI-WonderImgui Not a pure module */
