'use strict';

var $$Array = require("bs-platform/lib/js/array.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Caml_array = require("bs-platform/lib/js/caml_array.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var ViewTool$Wonderjs = require("../device/ViewTool.js");
var EventTool$Wonderjs = require("../../../unit/job/no_worker/tool/EventTool.js");
var FakeGlTool$Wonderjs = require("../../gl/FakeGlTool.js");
var FakeGlTool$WonderImgui = require("wonder-imgui/lib/js/test/integration/tool/FakeGlTool.js");
var AssetIMGUITool$Wonderjs = require("./AssetIMGUITool.js");
var BrowserDetectTool$Wonderjs = require("../browserDetect/BrowserDetectTool.js");
var ExtendIMGUIAPI$WonderImgui = require("wonder-imgui/lib/js/src/api/ExtendIMGUIAPI.js");
var RenderIMGUITool$WonderImgui = require("wonder-imgui/lib/js/test/integration/tool/RenderIMGUITool.js");
var ManageIMGUIMainService$Wonderjs = require("../../../../src/service/state/main/imgui/ManageIMGUIMainService.js");
var RecordIMGUIMainService$Wonderjs = require("../../../../src/service/state/main/imgui/RecordIMGUIMainService.js");

function prepareFntData(state) {
  var newrecord = Caml_array.caml_array_dup(state);
  var init = state[/* imguiRecord */44];
  newrecord[/* imguiRecord */44] = /* record */[
    /* ioData */init[/* ioData */0],
    /* isSetExecFuncInRenderWorkerForWorker */init[/* isSetExecFuncInRenderWorkerForWorker */1],
    /* extendData */init[/* extendData */2],
    /* wonderImguiIMGUIRecord */RenderIMGUITool$WonderImgui.prepareFntData(RecordIMGUIMainService$Wonderjs.getWonderIMGUIRecord(state))
  ];
  return newrecord;
}

function setDefaultSkinData(state, $staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, $staropt$star$4, $staropt$star$5, $staropt$star$6, $staropt$star$7, param) {
  var buttonColor = $staropt$star !== undefined ? $staropt$star : /* array */[
      0.35,
      0.1,
      0.1
    ];
  var hoverButtonColor = $staropt$star$1 !== undefined ? $staropt$star$1 : /* array */[
      0.35,
      0.1,
      0.1
    ];
  var clickButtonColor = $staropt$star$2 !== undefined ? $staropt$star$2 : /* array */[
      0.35,
      0.1,
      0.1
    ];
  var buttonImage = $staropt$star$3 !== undefined ? Caml_option.valFromOption($staropt$star$3) : null;
  var hoverButtonImage = $staropt$star$4 !== undefined ? Caml_option.valFromOption($staropt$star$4) : null;
  var clickButtonImage = $staropt$star$5 !== undefined ? Caml_option.valFromOption($staropt$star$5) : null;
  var fontAlign = $staropt$star$6 !== undefined ? $staropt$star$6 : /* Center */1;
  var fontColor = $staropt$star$7 !== undefined ? $staropt$star$7 : /* array */[
      1,
      1,
      1
    ];
  var __x = ExtendIMGUIAPI$WonderImgui.setSkinData(ExtendIMGUIAPI$WonderImgui.getDefaultSkinName(/* () */0), ExtendIMGUIAPI$WonderImgui.setButtonSkinData(ExtendIMGUIAPI$WonderImgui.createButtonSkinData(buttonColor, hoverButtonColor, clickButtonColor, buttonImage, hoverButtonImage, clickButtonImage, fontAlign, fontColor), ExtendIMGUIAPI$WonderImgui.unsafeGetDefaultSkinData(ManageIMGUIMainService$Wonderjs.getRecord(state))), ManageIMGUIMainService$Wonderjs.getRecord(state));
  return ManageIMGUIMainService$Wonderjs.setRecord(__x, state);
}

function prepareIMGUI(state) {
  var state$1 = AssetIMGUITool$Wonderjs.prepareFontAsset(state[0]);
  var state$2 = prepareFntData(state$1);
  var state$3 = BrowserDetectTool$Wonderjs.setChrome(state$2);
  var canvasDom = EventTool$Wonderjs.buildFakeCanvas(/* tuple */[
        0,
        0,
        undefined
      ]);
  return ViewTool$Wonderjs.setCanvas(canvasDom, state$3);
}

function prepareGl(sandbox, state) {
  var getExtension = RenderIMGUITool$WonderImgui.buildNoVAOExtension(sandbox);
  var bufferData = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
  var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$WonderImgui.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 1, undefined, undefined, undefined, undefined, 2, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(getExtension), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(bufferData), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state);
  return /* tuple */[
          state$1,
          1,
          2,
          bufferData
        ];
}

function judgeCustomTextureProgramPositionBufferData(bufferData, bufferDataCallCountAfterInit, targetData) {
  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0]($$Array.of_list(Sinon.getSpecificArg(1, Sinon.getCall(bufferDataCallCountAfterInit + 0 | 0, bufferData)))), targetData);
}

function judgeNoTextureProgramColorBufferData(bufferData, bufferDataCallCountAfterInit) {
  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0]($$Array.of_list(Sinon.getSpecificArg(1, Sinon.getCall(bufferDataCallCountAfterInit + 9 | 0, bufferData)))), /* array */[
              0.5,
              1,
              2,
              0.5,
              1,
              2,
              0.5,
              1,
              2,
              0.5,
              1,
              2
            ]);
}

exports.prepareFntData = prepareFntData;
exports.setDefaultSkinData = setDefaultSkinData;
exports.prepareIMGUI = prepareIMGUI;
exports.prepareGl = prepareGl;
exports.judgeCustomTextureProgramPositionBufferData = judgeCustomTextureProgramPositionBufferData;
exports.judgeNoTextureProgramColorBufferData = judgeNoTextureProgramColorBufferData;
/* Sinon Not a pure module */
