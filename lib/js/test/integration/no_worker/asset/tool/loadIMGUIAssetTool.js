'use strict';

var Caml_array = require("bs-platform/lib/js/caml_array.js");
var IOIMGUIAPI$WonderImgui = require("wonder-imgui/lib/js/src/api/IOIMGUIAPI.js");
var AssetIMGUIService$WonderImgui = require("wonder-imgui/lib/js/src/service/record/io/AssetIMGUIService.js");
var RecordIMGUIMainService$Wonderjs = require("../../../../../src/service/state/main/imgui/RecordIMGUIMainService.js");

function loadIMGUIAsset(fntFilePath, bitmapFilePath, customTextureSourceDataArr, param, state) {
  return AssetIMGUIService$WonderImgui.load(customTextureSourceDataArr, /* tuple */[
                param[0],
                param[1]
              ], IOIMGUIAPI$WonderImgui.addFont(fntFilePath, bitmapFilePath, RecordIMGUIMainService$Wonderjs.getWonderIMGUIRecord(state))).then((function (imguiRecord) {
                var newrecord = Caml_array.caml_array_dup(state);
                var init = state[/* imguiRecord */41];
                newrecord[/* imguiRecord */41] = /* record */[
                  /* ioData */init[/* ioData */0],
                  /* isSetIMGUIFuncInRenderWorkerForWorker */init[/* isSetIMGUIFuncInRenderWorkerForWorker */1],
                  /* wonderImguiIMGUIRecord */imguiRecord
                ];
                return Promise.resolve(newrecord);
              }));
}

exports.loadIMGUIAsset = loadIMGUIAsset;
/* IOIMGUIAPI-WonderImgui Not a pure module */
