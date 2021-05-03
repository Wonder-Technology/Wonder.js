'use strict';

var Caml_array = require("bs-platform/lib/js/caml_array.js");
var IMGUITool$Wonderjs = require("./IMGUITool.js");
var AssetTool$WonderImgui = require("wonder-imgui/lib/js/test/integration/tool/AssetTool.js");

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

exports.prepareFontAsset = prepareFontAsset;
/* IMGUITool-Wonderjs Not a pure module */
