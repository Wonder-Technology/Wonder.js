'use strict';

var Caml_array = require("bs-platform/lib/js/caml_array.js");
var RenderIMGUITool$WonderImgui = require("wonder-imgui/lib/js/test/integration/tool/RenderIMGUITool.js");
var RecordIMGUIMainService$Wonderjs = require("../../../../src/service/state/main/imgui/RecordIMGUIMainService.js");

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

exports.prepareFntData = prepareFntData;
/* RenderIMGUITool-WonderImgui Not a pure module */
