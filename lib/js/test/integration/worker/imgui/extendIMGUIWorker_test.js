'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var MainStateTool$Wonderjs = require("../../../tool/service/state/MainStateTool.js");
var TestWorkerTool$Wonderjs = require("../tool/TestWorkerTool.js");
var ExtendIMGUITool$Wonderjs = require("../../../tool/service/imgui/ExtendIMGUITool.js");
var IMGUIWorkerTool$Wonderjs = require("../job/all/tool/IMGUIWorkerTool.js");
var RenderIMGUITool$Wonderjs = require("../../../tool/service/imgui/RenderIMGUITool.js");
var RenderJobsRenderWorkerTool$Wonderjs = require("../job/render_worker/tool/RenderJobsRenderWorkerTool.js");
var BasicSourceTextureRenderWorkerTool$Wonderjs = require("../tool/texture/BasicSourceTextureRenderWorkerTool.js");

Wonder_jest.describe("test extend imgui in render worker", (function (param) {
        Sinon.getSandboxDefaultVal(/* () */0);
        MainStateTool$Wonderjs.createState(/* () */0);
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        MainStateTool$Wonderjs.createState(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                return TestWorkerTool$Wonderjs.clear(sandbox);
              }));
        return Wonder_jest.describe("test extend by add skin data and add custom control", (function (param) {
                      return Wonder_jest.describe("test render", (function (param) {
                                    Wonder_jest.beforeAllPromise(undefined, (function (param) {
                                            return Curry._1(BasicSourceTextureRenderWorkerTool$Wonderjs.buildFakeCreateImageBitmapFunc, /* () */0);
                                          }));
                                    Wonder_jest.afterAllPromise(undefined, (function (param) {
                                            return Curry._1(BasicSourceTextureRenderWorkerTool$Wonderjs.clearFakeCreateImageBitmapFunc, /* () */0);
                                          }));
                                    return Wonder_jest.testPromise("test color buffer data", undefined, (function (param) {
                                                  var match = IMGUIWorkerTool$Wonderjs.prepareForTestInRenderWorkerJob(sandbox);
                                                  var bufferData = match[1];
                                                  var state = ExtendIMGUITool$Wonderjs.addExtendDataAndSetExecFunc(match[0]);
                                                  var bufferDataCallCountAfterInit = /* record */[/* contents */0];
                                                  return RenderJobsRenderWorkerTool$Wonderjs.initAndMainLoopAndRender((function (param) {
                                                                return Promise.resolve(RenderIMGUITool$Wonderjs.judgeNoTextureProgramColorBufferData(bufferData, bufferDataCallCountAfterInit[0]));
                                                              }), state, sandbox, (function (state) {
                                                                bufferDataCallCountAfterInit[0] = Sinon.getCallCount(bufferData);
                                                                return /* () */0;
                                                              }), /* () */0);
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
