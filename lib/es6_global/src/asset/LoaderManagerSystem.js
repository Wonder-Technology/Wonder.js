

import * as Caml_array from "../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as IOIMGUIAPI$WonderImgui from "../../../../node_modules/wonder-imgui/lib/es6_global/src/api/IOIMGUIAPI.js";
import * as LoadWholeWDBSystem$Wonderjs from "./LoadWholeWDBSystem.js";
import * as LoadStreamWDBSystem$Wonderjs from "./LoadStreamWDBSystem.js";
import * as ConfigDataLoaderSystem$Wonderjs from "./ConfigDataLoaderSystem.js";
import * as RecordIMGUIMainService$Wonderjs from "../service/state/main/imgui/RecordIMGUIMainService.js";

var loadConfig = ConfigDataLoaderSystem$Wonderjs.load;

function loadWholeWDB(wdbPath, param, fetchFunc, state) {
  return LoadWholeWDBSystem$Wonderjs.load(wdbPath, /* tuple */[
              param[0],
              param[1],
              param[2],
              param[3],
              param[4]
            ], fetchFunc, state);
}

var loadStreamWDB = LoadStreamWDBSystem$Wonderjs.load;

function loadIMGUIAsset(param, customTextureSourceDataArr, param$1, state) {
  return IOIMGUIAPI$WonderImgui.load(customTextureSourceDataArr, param$1[1], IOIMGUIAPI$WonderImgui.addFont(param[0], param[1], RecordIMGUIMainService$Wonderjs.getWonderIMGUIRecord(state))).then((function (imguiRecord) {
                var newrecord = Caml_array.caml_array_dup(state);
                var init = state[/* imguiRecord */44];
                newrecord[/* imguiRecord */44] = /* record */[
                  /* ioData */init[/* ioData */0],
                  /* isSetExecFuncInRenderWorkerForWorker */init[/* isSetExecFuncInRenderWorkerForWorker */1],
                  /* extendData */init[/* extendData */2],
                  /* wonderImguiIMGUIRecord */imguiRecord
                ];
                return Promise.resolve(newrecord);
              }));
}

export {
  loadConfig ,
  loadWholeWDB ,
  loadStreamWDB ,
  loadIMGUIAsset ,
  
}
/* IOIMGUIAPI-WonderImgui Not a pure module */
