'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var StateAPI$Wonderjs = require("../../../../../src/api/StateAPI.js");
var MainStateTool$Wonderjs = require("../../../../tool/service/state/MainStateTool.js");
var TestWorkerTool$Wonderjs = require("../../tool/TestWorkerTool.js");
var FakeGlWorkerTool$Wonderjs = require("../../tool/FakeGlWorkerTool.js");
var LightMaterialAPI$Wonderjs = require("../../../../../src/api/material/LightMaterialAPI.js");
var BrowserDetectTool$Wonderjs = require("../../../../tool/service/browserDetect/BrowserDetectTool.js");
var LightMaterialTool$Wonderjs = require("../../../../tool/service/material/LightMaterialTool.js");
var BasicSourceTextureAPI$Wonderjs = require("../../../../../src/api/texture/BasicSourceTextureAPI.js");
var RenderJobsRenderWorkerTool$Wonderjs = require("../../job/render_worker/tool/RenderJobsRenderWorkerTool.js");
var BasicSourceTextureRenderWorkerTool$Wonderjs = require("../../tool/texture/BasicSourceTextureRenderWorkerTool.js");

Wonder_jest.describe("load stream wdb in worker", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        MainStateTool$Wonderjs.createState(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                return TestWorkerTool$Wonderjs.clear(sandbox);
              }));
        Wonder_jest.beforeAllPromise(undefined, (function (param) {
                return Curry._1(BasicSourceTextureRenderWorkerTool$Wonderjs.buildFakeCreateImageBitmapFunc, /* () */0);
              }));
        Wonder_jest.afterAllPromise(undefined, (function (param) {
                return Curry._1(BasicSourceTextureRenderWorkerTool$Wonderjs.clearFakeCreateImageBitmapFunc, /* () */0);
              }));
        return Wonder_jest.testPromise("test set the same texture's source which has set the default source before", undefined, (function (param) {
                      var match = BasicSourceTextureRenderWorkerTool$Wonderjs.prepareStateAndCreateTwoMaps(sandbox);
                      var source2 = match[4][1];
                      var map1 = match[3][0];
                      var state = FakeGlWorkerTool$Wonderjs.setFakeGl(FakeGlWorkerTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                      var match$1 = LightMaterialTool$Wonderjs.createGameObject(state);
                      var state$1 = LightMaterialAPI$Wonderjs.setLightMaterialDiffuseMap(match$1[2], map1, match$1[0]);
                      var state$2 = BrowserDetectTool$Wonderjs.setChrome(state$1);
                      return RenderJobsRenderWorkerTool$Wonderjs.initAndMainLoopAndRender((function (param) {
                                    var state = StateAPI$Wonderjs.unsafeGetState(/* () */0);
                                    var state$1 = BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureSource(map1, source2, state);
                                    return RenderJobsRenderWorkerTool$Wonderjs.mainLoopAndRender((function (param) {
                                                  return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](BasicSourceTextureAPI$Wonderjs.unsafeGetBasicSourceTextureSource(map1, state$1)), source2));
                                                }), state$1, sandbox, undefined, /* () */0);
                                  }), state$2, sandbox, undefined, /* () */0);
                    }));
      }));

/*  Not a pure module */
