'use strict';

var Caml_array = require("bs-platform/lib/js/caml_array.js");
var IMGUITool$Wonderjs = require("./IMGUITool.js");
var AssetTool$WonderImgui = require("wonder-imgui/lib/js/test/integration/tool/AssetTool.js");

function prepareFontAsset(state) {
  var newrecord = Caml_array.caml_array_dup(state);
  var init = state[/* imguiRecord */41];
  newrecord[/* imguiRecord */41] = /* record */[
    /* ioData */init[/* ioData */0],
    /* isSetIMGUIFuncInRenderWorkerForWorker */init[/* isSetIMGUIFuncInRenderWorkerForWorker */1],
    /* wonderImguiIMGUIRecord */AssetTool$WonderImgui.prepareFontAsset(IMGUITool$Wonderjs.getWonderIMGUIRecord(state))
  ];
  return newrecord;
}

exports.prepareFontAsset = prepareFontAsset;
/* IMGUITool-Wonderjs Not a pure module */
