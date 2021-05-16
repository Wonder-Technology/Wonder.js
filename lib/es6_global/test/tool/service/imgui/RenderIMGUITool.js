

import * as $$Array from "../../../../../../node_modules/bs-platform/lib/es6/array.js";
import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Caml_array from "../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Caml_option from "../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as Wonder_jest from "../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as ViewTool$Wonderjs from "../device/ViewTool.js";
import * as EventTool$Wonderjs from "../../../unit/job/no_worker/tool/EventTool.js";
import * as FakeGlTool$Wonderjs from "../../gl/FakeGlTool.js";
import * as FakeGlTool$WonderImgui from "../../../../../../node_modules/wonder-imgui/lib/es6_global/test/integration/tool/FakeGlTool.js";
import * as AssetIMGUITool$Wonderjs from "./AssetIMGUITool.js";
import * as BrowserDetectTool$Wonderjs from "../browserDetect/BrowserDetectTool.js";
import * as ExtendIMGUIAPI$WonderImgui from "../../../../../../node_modules/wonder-imgui/lib/es6_global/src/api/ExtendIMGUIAPI.js";
import * as RenderIMGUITool$WonderImgui from "../../../../../../node_modules/wonder-imgui/lib/es6_global/test/integration/tool/RenderIMGUITool.js";
import * as ManageIMGUIMainService$Wonderjs from "../../../../src/service/state/main/imgui/ManageIMGUIMainService.js";
import * as RecordIMGUIMainService$Wonderjs from "../../../../src/service/state/main/imgui/RecordIMGUIMainService.js";

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

export {
  prepareFntData ,
  setDefaultSkinData ,
  prepareIMGUI ,
  prepareGl ,
  judgeCustomTextureProgramPositionBufferData ,
  judgeNoTextureProgramColorBufferData ,
  
}
/* Sinon Not a pure module */
