

import * as Caml_array from "./../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as IMGUITool$Wonderjs from "./IMGUITool.js";
import * as AssetTool$WonderImgui from "./../../../../../../node_modules/wonder-imgui/lib/es6_global/test/integration/tool/AssetTool.js";

function prepareFontAsset(state) {
  var newrecord = Caml_array.caml_array_dup(state);
  var init = state[/* imguiRecord */44];
  newrecord[/* imguiRecord */44] = /* record */[
    /* ioData */init[/* ioData */0],
    /* isSetExecFuncInRenderWorkerForWorker */init[/* isSetExecFuncInRenderWorkerForWorker */1],
    /* extendData */init[/* extendData */2],
    /* wonderImguiIMGUIRecord */AssetTool$WonderImgui.prepareFontAsset(IMGUITool$Wonderjs.getWonderIMGUIRecord(state))
  ];
  return newrecord;
}

export {
  prepareFontAsset ,
  
}
/* IMGUITool-Wonderjs Not a pure module */
