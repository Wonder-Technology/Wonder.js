'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var SettingTool$Wonderjs = require("../../../../../tool/service/setting/SettingTool.js");
var MainStateTool$Wonderjs = require("../../../../../tool/service/state/MainStateTool.js");
var TestWorkerTool$Wonderjs = require("../../../tool/TestWorkerTool.js");
var FakeGlWorkerTool$Wonderjs = require("../../../tool/FakeGlWorkerTool.js");
var TestMainWorkerTool$Wonderjs = require("../../main_worker/tool/TestMainWorkerTool.js");
var RenderWorkerStateTool$Wonderjs = require("../../../../../tool/service/state/RenderWorkerStateTool.js");
var RenderJobsRenderWorkerTool$Wonderjs = require("../tool/RenderJobsRenderWorkerTool.js");
var SourceInstanceRenderWorkerTool$Wonderjs = require("../../../../../unit/tool/service/render_worker/instance/SourceInstanceRenderWorkerTool.js");
var FrontRenderLightHardwareInstanceRenderWorkerTool$Wonderjs = require("../tool/FrontRenderLightHardwareInstanceRenderWorkerTool.js");
var FrontRenderLightHardwareInstanceForNoWorkerAndWorkerJobTool$Wonderjs = require("../../../../tool/job/FrontRenderLightHardwareInstanceForNoWorkerAndWorkerJobTool.js");

Wonder_jest.describe("test front render light hardware instance in render worker", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var state = /* record */[/* contents */MainStateTool$Wonderjs.createState(/* () */0)];
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                state[0] = TestMainWorkerTool$Wonderjs.initWithJobConfig(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, SettingTool$Wonderjs.buildBufferConfigStr(300, undefined, 500, undefined, 48, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), /* () */0);
                return /* () */0;
              }));
        afterEach((function () {
                return TestWorkerTool$Wonderjs.clear(sandbox);
              }));
        Wonder_jest.describe("send instance data", (function (param) {
                return Wonder_jest.describe("send modelMatrix and normalMatrix data", (function (param) {
                              return Wonder_jest.describe("send sourceInstance gameObject's and objectInstanceGameObject gameObjects' model matrices", (function (param) {
                                            var _prepare = function (sandbox, state) {
                                              var match = FrontRenderLightHardwareInstanceRenderWorkerTool$Wonderjs.prepare(sandbox, state);
                                              var match$1 = match[2];
                                              return /* tuple */[
                                                      match[0],
                                                      match[1],
                                                      match$1[3],
                                                      match$1[4]
                                                    ];
                                            };
                                            return Wonder_jest.testPromise("buffer sub data", undefined, (function (param) {
                                                          var match = FrontRenderLightHardwareInstanceForNoWorkerAndWorkerJobTool$Wonderjs.prepareForBufferSubDataCase(sandbox, _prepare, state);
                                                          var bufferSubData = match[3];
                                                          var array_buffer = match[2];
                                                          var match$1 = match[1];
                                                          var objectTransform = match$1[1];
                                                          var sourceTransform = match$1[0];
                                                          var state$1 = FakeGlWorkerTool$Wonderjs.setFakeGl(FakeGlWorkerTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, array_buffer, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(bufferSubData), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                                          return RenderJobsRenderWorkerTool$Wonderjs.initAndMainLoopAndRender((function (param) {
                                                                        return Promise.resolve(FrontRenderLightHardwareInstanceForNoWorkerAndWorkerJobTool$Wonderjs.testForBufferSubDataCase(sandbox, /* tuple */[
                                                                                        sourceTransform,
                                                                                        objectTransform
                                                                                      ], array_buffer, bufferSubData, MainStateTool$Wonderjs.unsafeGetState(/* () */0)));
                                                                      }), state$1, sandbox, undefined, /* () */0);
                                                        }));
                                          }));
                            }));
              }));
        return Wonder_jest.describe("fix bug", (function (param) {
                      return Wonder_jest.describe("test create sourceInstance type arrays", (function (param) {
                                    return Wonder_jest.testPromise("test objectInstanceTransformCollections->length", undefined, (function (param) {
                                                  TestMainWorkerTool$Wonderjs.openContractCheck(/* () */0);
                                                  var state = TestMainWorkerTool$Wonderjs.initWithJobConfig(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, SettingTool$Wonderjs.buildBufferConfigStr(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 2, 3, /* () */0), /* () */0);
                                                  var match = FrontRenderLightHardwareInstanceRenderWorkerTool$Wonderjs.prepare(sandbox, state);
                                                  var state$1 = FakeGlWorkerTool$Wonderjs.setFakeGl(FakeGlWorkerTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                                  MainStateTool$Wonderjs.setState(state$1);
                                                  return RenderJobsRenderWorkerTool$Wonderjs.initAndMainLoopAndRender((function (param) {
                                                                return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](SourceInstanceRenderWorkerTool$Wonderjs.unsafeGetObjectInstanceTransformCollections(RenderWorkerStateTool$Wonderjs.unsafeGetState(/* () */0)).length), 6));
                                                              }), state$1, sandbox, undefined, /* () */0);
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
