

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as Js_primitive from "../../../../../../../node_modules/bs-platform/lib/es6/js_primitive.js";
import * as TestTool$Wonderjs from "../../../../tool/TestTool.js";
import * as ViewTool$Wonderjs from "../../../../tool/service/device/ViewTool.js";
import * as EventTool$Wonderjs from "../../../../unit/job/no_worker/tool/EventTool.js";
import * as IMGUITool$Wonderjs from "../../../../tool/service/imgui/IMGUITool.js";
import * as FakeGlTool$Wonderjs from "../../../../tool/gl/FakeGlTool.js";
import * as FakeGlTool$WonderImgui from "../../../../../../../node_modules/wonder-imgui/lib/es6_global/test/integration/tool/FakeGlTool.js";
import * as MainStateTool$Wonderjs from "../../../../tool/service/state/MainStateTool.js";
import * as AssetIMGUITool$Wonderjs from "../../../../tool/service/imgui/AssetIMGUITool.js";
import * as ManageIMGUIAPI$Wonderjs from "../../../../../src/api/imgui/ManageIMGUIAPI.js";
import * as MouseEventTool$Wonderjs from "../../../../unit/job/no_worker/tool/MouseEventTool.js";
import * as NoWorkerJobTool$Wonderjs from "../../../../tool/service/job/no_worker/NoWorkerJobTool.js";
import * as RenderIMGUITool$Wonderjs from "../../../../tool/service/imgui/RenderIMGUITool.js";
import * as BrowserDetectTool$Wonderjs from "../../../../tool/service/browserDetect/BrowserDetectTool.js";
import * as ButtonIMGUITool$WonderImgui from "../../../../../../../node_modules/wonder-imgui/lib/es6_global/test/integration/tool/ButtonIMGUITool.js";
import * as RenderIMGUITool$WonderImgui from "../../../../../../../node_modules/wonder-imgui/lib/es6_global/test/integration/tool/RenderIMGUITool.js";
import * as NoWorkerJobConfigTool$Wonderjs from "../../../../tool/service/noWorkerJob/NoWorkerJobConfigTool.js";

describe("test render imgui job", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var state = /* record */[/* contents */MainStateTool$Wonderjs.createState(/* () */0)];
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                state[0] = TestTool$Wonderjs.initWithJobConfig(sandbox, undefined, undefined, NoWorkerJobConfigTool$Wonderjs.buildNoWorkerJobConfig(undefined, "\n        [\n    {\n      \"name\": \"default\",\n      \"jobs\": [\n        {\n          \"name\": \"init_imgui\"\n        }\n      ]\n    }\n  ]\n        ", "\n        [\n    {\n      \"name\": \"default\",\n      \"jobs\": [\n        {\n          \"name\": \"render_imgui\"\n        }\n      ]\n    }\n  ]\n        ", "\n[\n        {\n          \"name\": \"init_imgui\"\n        }\n]\n        ", "\n[\n        {\n          \"name\": \"render_imgui\"\n        }\n]\n        ", /* () */0), undefined, /* () */0);
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        Wonder_jest.test("if not load imgui asset, not error", (function () {
                var canvas = {
                  width: 100,
                  height: 200
                };
                var state$1 = ViewTool$Wonderjs.setCanvas(canvas, state[0]);
                var state$2 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state$1);
                return Wonder_jest.Expect[/* toThrow */18](Wonder_jest.Expect[/* not_ */22](Wonder_jest.Expect[/* expect */0]((function () {
                                      var state$3 = NoWorkerJobTool$Wonderjs.execInitJobs(state$2);
                                      NoWorkerJobTool$Wonderjs.execLoopJobs(state$3);
                                      return /* () */0;
                                    }))));
              }));
        describe("else, render imgui", (function () {
                describe("test render image", (function () {
                        beforeEach((function () {
                                state[0] = AssetIMGUITool$Wonderjs.prepareFontAsset(state[0]);
                                return /* () */0;
                              }));
                        return Wonder_jest.test("send imgui buffers data", (function () {
                                      var state$1 = RenderIMGUITool$Wonderjs.prepareFntData(state[0]);
                                      var canvas = {
                                        width: 1000,
                                        height: 500
                                      };
                                      var state$2 = ViewTool$Wonderjs.setCanvas(canvas, state$1);
                                      var getExtension = RenderIMGUITool$WonderImgui.buildNoVAOExtension(sandbox);
                                      var bufferData = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                      var state$3 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$WonderImgui.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 1, undefined, undefined, undefined, undefined, 2, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(getExtension), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(bufferData), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state$2);
                                      var match = RenderIMGUITool$WonderImgui.buildImageData(/* () */0);
                                      var match$1 = match[0];
                                      var textureId1 = match$1[2];
                                      var match$2 = match$1[1];
                                      var imageT11 = match$2[3];
                                      var imageS11 = match$2[2];
                                      var imageT01 = match$2[1];
                                      var imageS01 = match$2[0];
                                      var match$3 = match$1[0];
                                      var imageHeight1 = match$3[3];
                                      var imageWidth1 = match$3[2];
                                      var imageY1 = match$3[1];
                                      var imageX1 = match$3[0];
                                      var image1Data = /* array */[
                                        50,
                                        60,
                                        50,
                                        310,
                                        200,
                                        60,
                                        200,
                                        310
                                      ];
                                      var state$4 = ManageIMGUIAPI$Wonderjs.setIMGUIFunc(-1, (function (_, apiJsObj, state) {
                                              var imageFunc = apiJsObj.image;
                                              return imageFunc(/* tuple */[
                                                          imageX1,
                                                          imageY1,
                                                          imageWidth1,
                                                          imageHeight1
                                                        ], /* tuple */[
                                                          imageS01,
                                                          imageT01,
                                                          imageS11,
                                                          imageT11
                                                        ], textureId1, state);
                                            }), state$3);
                                      var state$5 = NoWorkerJobTool$Wonderjs.execInitJobs(state$4);
                                      var bufferDataCallCountAfterInit = Sinon.getCallCount(bufferData);
                                      NoWorkerJobTool$Wonderjs.execLoopJobs(state$5);
                                      return Sinon.toCalledWith(/* array */[
                                                  1,
                                                  new Float32Array(image1Data),
                                                  2
                                                ], Wonder_jest.Expect[/* expect */0](Sinon.getCall(bufferDataCallCountAfterInit + 0 | 0, bufferData)));
                                    }));
                      }));
                describe("test render button", (function () {
                        var _prepareState = function () {
                          state[0] = TestTool$Wonderjs.initWithJobConfigWithoutBuildFakeDom(sandbox, undefined, undefined, undefined, undefined, undefined, NoWorkerJobConfigTool$Wonderjs.buildNoWorkerJobConfig(undefined, "\n        [\n    {\n      \"name\": \"default\",\n      \"jobs\": [\n        {\n          \"name\": \"init_event\"\n        },\n        {\n          \"name\": \"init_imgui\"\n        }\n      ]\n    }\n  ]\n        ", "\n        [\n    {\n      \"name\": \"default\",\n      \"jobs\": [\n        {\n          \"name\": \"render_imgui\"\n        }\n      ]\n    }\n  ]\n        ", "\n[\n\n        {\n          \"name\": \"init_event\"\n        },\n        {\n          \"name\": \"init_imgui\"\n        }\n]\n        ", "\n[\n        {\n          \"name\": \"render_imgui\"\n        }\n]\n        ", /* () */0), undefined, /* () */0);
                          var state$1 = AssetIMGUITool$Wonderjs.prepareFontAsset(state[0]);
                          var state$2 = RenderIMGUITool$Wonderjs.prepareFntData(state$1);
                          MainStateTool$Wonderjs.setState(state$2);
                          var state$3 = BrowserDetectTool$Wonderjs.setChrome(/* () */0);
                          var canvasDom = EventTool$Wonderjs.buildFakeCanvas(/* tuple */[
                                0,
                                0,
                                undefined
                              ]);
                          return ViewTool$Wonderjs.setCanvas(canvasDom, state$3);
                        };
                        var _prepareGl = function (state) {
                          var getExtension = RenderIMGUITool$WonderImgui.buildNoVAOExtension(sandbox);
                          var bufferData = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                          var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$WonderImgui.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 1, undefined, undefined, undefined, undefined, 2, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(getExtension), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(bufferData), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state);
                          return /* tuple */[
                                  state$1,
                                  1,
                                  2,
                                  bufferData
                                ];
                        };
                        describe("test mousedown button", (function () {
                                return Wonder_jest.test("test color buffer data", (function () {
                                              var state = _prepareState(/* () */0);
                                              var match = _prepareGl(state);
                                              var bufferData = match[3];
                                              var buttonData = ButtonIMGUITool$WonderImgui.buildButtonData1(/* () */0);
                                              var match$1 = buttonData[0];
                                              var state$1 = ManageIMGUIAPI$Wonderjs.setIMGUIFunc(buttonData, (function (customData, apiJsObj, state) {
                                                      var match = customData[0];
                                                      var buttonFunc = apiJsObj.button;
                                                      return buttonFunc(/* tuple */[
                                                                    match[0],
                                                                    match[1],
                                                                    match[2],
                                                                    match[3]
                                                                  ], customData[1], state)[0];
                                                    }), match[0]);
                                              var state$2 = ManageIMGUIAPI$Wonderjs.setSetting(IMGUITool$Wonderjs.buildSettingJsObj(undefined, undefined, undefined, /* array */[
                                                        0.1,
                                                        0.2,
                                                        0.3
                                                      ], undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state$1);
                                              var state$3 = NoWorkerJobTool$Wonderjs.execInitJobs(state$2);
                                              var bufferDataCallCountAfterInit = Sinon.getCallCount(bufferData);
                                              var state$4 = MainStateTool$Wonderjs.setState(state$3);
                                              EventTool$Wonderjs.triggerDomEvent("mousedown", EventTool$Wonderjs.getPointEventBindedDom(state$4), MouseEventTool$Wonderjs.buildMouseEvent(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0));
                                              EventTool$Wonderjs.triggerDomEvent("mousemove", EventTool$Wonderjs.getPointEventBindedDom(state$4), MouseEventTool$Wonderjs.buildMouseEvent(match$1[0], match$1[1], undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0));
                                              EventTool$Wonderjs.restore(state$4);
                                              var state$5 = MainStateTool$Wonderjs.unsafeGetState(/* () */0);
                                              NoWorkerJobTool$Wonderjs.execLoopJobs(state$5);
                                              return Sinon.toCalledWith(/* array */[
                                                          match[1],
                                                          new Float32Array(/* array */[
                                                                0.1,
                                                                0.2,
                                                                0.3,
                                                                0.1,
                                                                0.2,
                                                                0.3,
                                                                0.1,
                                                                0.2,
                                                                0.3,
                                                                0.1,
                                                                0.2,
                                                                0.3,
                                                                1,
                                                                1,
                                                                1,
                                                                1,
                                                                1,
                                                                1,
                                                                1,
                                                                1,
                                                                1,
                                                                1,
                                                                1,
                                                                1,
                                                                1,
                                                                1,
                                                                1,
                                                                1,
                                                                1,
                                                                1,
                                                                1,
                                                                1,
                                                                1,
                                                                1,
                                                                1,
                                                                1
                                                              ]),
                                                          match[2]
                                                        ], Wonder_jest.Expect[/* expect */0](Sinon.getCall(bufferDataCallCountAfterInit + 1 | 0, bufferData)));
                                            }));
                              }));
                        describe("test click button", (function () {
                                return Wonder_jest.test("test button is click", (function () {
                                              var state = _prepareState(/* () */0);
                                              var match = _prepareGl(state);
                                              var buttonData = ButtonIMGUITool$WonderImgui.buildButtonData1(/* () */0);
                                              var match$1 = buttonData[0];
                                              var isClick = /* record */[/* contents */false];
                                              var state$1 = ManageIMGUIAPI$Wonderjs.setIMGUIFunc(buttonData, (function (customData, apiJsObj, state) {
                                                      var match = customData[0];
                                                      var buttonFunc = apiJsObj.button;
                                                      var match$1 = buttonFunc(/* tuple */[
                                                            match[0],
                                                            match[1],
                                                            match[2],
                                                            match[3]
                                                          ], customData[1], state);
                                                      isClick[0] = match$1[1];
                                                      return match$1[0];
                                                    }), match[0]);
                                              var state$2 = NoWorkerJobTool$Wonderjs.execInitJobs(state$1);
                                              var state$3 = MainStateTool$Wonderjs.setState(state$2);
                                              EventTool$Wonderjs.triggerDomEvent("mousemove", EventTool$Wonderjs.getPointEventBindedDom(state$3), MouseEventTool$Wonderjs.buildMouseEvent(match$1[0], match$1[1], undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0));
                                              EventTool$Wonderjs.triggerDomEvent("mousedown", EventTool$Wonderjs.getPointEventBindedDom(state$3), MouseEventTool$Wonderjs.buildMouseEvent(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0));
                                              EventTool$Wonderjs.triggerDomEvent("mouseup", EventTool$Wonderjs.getPointEventBindedDom(state$3), MouseEventTool$Wonderjs.buildMouseEvent(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0));
                                              EventTool$Wonderjs.restore(state$3);
                                              var state$4 = MainStateTool$Wonderjs.unsafeGetState(/* () */0);
                                              NoWorkerJobTool$Wonderjs.execLoopJobs(state$4);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](isClick[0]), true);
                                            }));
                              }));
                        describe("reset io data->point event state when point up", (function () {
                                return Wonder_jest.test("test button isn't click after point up", (function () {
                                              var state = _prepareState(/* () */0);
                                              var match = _prepareGl(state);
                                              var buttonData = ButtonIMGUITool$WonderImgui.buildButtonData1(/* () */0);
                                              var match$1 = buttonData[0];
                                              var isClick = /* record */[/* contents */false];
                                              var state$1 = ManageIMGUIAPI$Wonderjs.setIMGUIFunc(buttonData, (function (customData, apiJsObj, state) {
                                                      var match = customData[0];
                                                      var buttonFunc = apiJsObj.button;
                                                      var match$1 = buttonFunc(/* tuple */[
                                                            match[0],
                                                            match[1],
                                                            match[2],
                                                            match[3]
                                                          ], customData[1], state);
                                                      isClick[0] = match$1[1];
                                                      return match$1[0];
                                                    }), match[0]);
                                              var state$2 = NoWorkerJobTool$Wonderjs.execInitJobs(state$1);
                                              var state$3 = MainStateTool$Wonderjs.setState(state$2);
                                              EventTool$Wonderjs.triggerDomEvent("mousemove", EventTool$Wonderjs.getPointEventBindedDom(state$3), MouseEventTool$Wonderjs.buildMouseEvent(match$1[0], match$1[1], undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0));
                                              EventTool$Wonderjs.triggerDomEvent("mousedown", EventTool$Wonderjs.getPointEventBindedDom(state$3), MouseEventTool$Wonderjs.buildMouseEvent(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0));
                                              EventTool$Wonderjs.triggerDomEvent("mouseup", EventTool$Wonderjs.getPointEventBindedDom(state$3), MouseEventTool$Wonderjs.buildMouseEvent(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0));
                                              var state$4 = EventTool$Wonderjs.restore(state$3);
                                              var state$5 = NoWorkerJobTool$Wonderjs.execLoopJobs(state$4);
                                              var state$6 = MainStateTool$Wonderjs.setState(state$5);
                                              EventTool$Wonderjs.triggerDomEvent("mousedown", EventTool$Wonderjs.getPointEventBindedDom(state$6), MouseEventTool$Wonderjs.buildMouseEvent(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0));
                                              var state$7 = EventTool$Wonderjs.restore(state$6);
                                              NoWorkerJobTool$Wonderjs.execLoopJobs(state$7);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](isClick[0]), false);
                                            }));
                              }));
                        return /* () */0;
                      }));
                return /* () */0;
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
