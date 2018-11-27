

import * as Caml_array from "../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as RenderIMGUITool$WonderImgui from "../../../../../../node_modules/wonder-imgui/lib/es6_global/test/integration/tool/RenderIMGUITool.js";
import * as RecordIMGUIMainService$Wonderjs from "../../../../src/service/state/main/imgui/RecordIMGUIMainService.js";

function prepareFntData(state) {
  var newrecord = Caml_array.caml_array_dup(state);
  var init = state[/* imguiRecord */41];
  newrecord[/* imguiRecord */41] = /* record */[
    /* ioData */init[/* ioData */0],
    /* isSetIMGUIFuncInRenderWorkerForWorker */init[/* isSetIMGUIFuncInRenderWorkerForWorker */1],
    /* wonderImguiIMGUIRecord */RenderIMGUITool$WonderImgui.prepareFntData(RecordIMGUIMainService$Wonderjs.getWonderIMGUIRecord(state))
  ];
  return newrecord;
}

export {
  prepareFntData ,
  
}
/* RenderIMGUITool-WonderImgui Not a pure module */
