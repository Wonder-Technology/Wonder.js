

import * as Caml_array from "../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as IOIMGUIAPI$WonderImgui from "../../../../node_modules/wonder-imgui/lib/es6_global/src/api/IOIMGUIAPI.js";
import * as LoadWDBSystem$Wonderjs from "./LoadWDBSystem.js";
import * as ConfigDataLoaderSystem$Wonderjs from "./ConfigDataLoaderSystem.js";
import * as RecordIMGUIMainService$Wonderjs from "../service/state/main/imgui/RecordIMGUIMainService.js";

var loadConfig = ConfigDataLoaderSystem$Wonderjs.load;

var loadWDB = LoadWDBSystem$Wonderjs.load;

function loadIMGUIAsset(param, customTextureSourceDataArr, _, state) {
  return IOIMGUIAPI$WonderImgui.load(customTextureSourceDataArr, IOIMGUIAPI$WonderImgui.addFont(param[0], param[1], RecordIMGUIMainService$Wonderjs.getWonderIMGUIRecord(state))).then((function (imguiRecord) {
                var newrecord = Caml_array.caml_array_dup(state);
                var init = state[/* imguiRecord */42];
                newrecord[/* imguiRecord */42] = /* record */[
                  /* ioData */init[/* ioData */0],
                  /* wonderImguiIMGUIRecord */imguiRecord
                ];
                return Promise.resolve(newrecord);
              }));
}

export {
  loadConfig ,
  loadWDB ,
  loadIMGUIAsset ,
  
}
/* IOIMGUIAPI-WonderImgui Not a pure module */
