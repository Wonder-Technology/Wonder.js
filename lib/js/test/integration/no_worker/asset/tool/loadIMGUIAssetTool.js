'use strict';

var Caml_array = require("bs-platform/lib/js/caml_array.js");
var IOIMGUIAPI$WonderImgui = require("wonder-imgui/lib/js/src/api/IOIMGUIAPI.js");
var AssetIMGUIService$WonderImgui = require("wonder-imgui/lib/js/src/service/record/io/AssetIMGUIService.js");
var RecordIMGUIMainService$Wonderjs = require("../../../../../src/service/state/main/imgui/RecordIMGUIMainService.js");

function loadIMGUIAsset(fntFilePath, bitmapFilePath, customTextureSourceDataArr, param, state) {
  return AssetIMGUIService$WonderImgui.LoadAsset[/* load */1](customTextureSourceDataArr, /* tuple */[
                param[0],
                param[1]
              ], IOIMGUIAPI$WonderImgui.addFont(fntFilePath, bitmapFilePath, RecordIMGUIMainService$Wonderjs.getWonderIMGUIRecord(state))).then((function (imguiRecord) {
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

exports.loadIMGUIAsset = loadIMGUIAsset;
/* IOIMGUIAPI-WonderImgui Not a pure module */
