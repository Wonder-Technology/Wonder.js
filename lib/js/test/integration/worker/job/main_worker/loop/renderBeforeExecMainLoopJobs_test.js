'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var CameraTool$Wonderjs = require("../../../../../tool/service/camera/CameraTool.js");
var SettingTool$Wonderjs = require("../../../../../tool/service/setting/SettingTool.js");
var MainStateTool$Wonderjs = require("../../../../../tool/service/state/MainStateTool.js");
var TestWorkerTool$Wonderjs = require("../../../tool/TestWorkerTool.js");
var FakeGlWorkerTool$Wonderjs = require("../../../tool/FakeGlWorkerTool.js");
var RenderBasicJobTool$Wonderjs = require("../../../../../tool/job/render_basic/RenderBasicJobTool.js");
var TestMainWorkerTool$Wonderjs = require("../tool/TestMainWorkerTool.js");
var RenderJobsRenderWorkerTool$Wonderjs = require("../../render_worker/tool/RenderJobsRenderWorkerTool.js");

Wonder_jest.describe("test render before exec main loop jobs", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var state = /* record */[/* contents */MainStateTool$Wonderjs.createState(/* () */0)];
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                state[0] = TestMainWorkerTool$Wonderjs.initWithJobConfig(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, SettingTool$Wonderjs.buildBufferConfigStr(undefined, undefined, 5, 8, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), /* () */0);
                return /* () */0;
              }));
        afterEach((function () {
                return TestWorkerTool$Wonderjs.clear(sandbox);
              }));
        return Wonder_jest.describe("not render in render worker in the first frame", (function (param) {
                      var _prepare = function (sandbox, state) {
                        var match = RenderBasicJobTool$Wonderjs.prepareGameObject(sandbox, state);
                        return CameraTool$Wonderjs.createCameraGameObject(match[0])[0];
                      };
                      Wonder_jest.testPromise("not send uniform data", undefined, (function (param) {
                              var state$1 = _prepare(sandbox, state[0]);
                              var uniformMatrix4fv = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                              var uniform3f = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                              var state$2 = FakeGlWorkerTool$Wonderjs.setFakeGl(FakeGlWorkerTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(uniformMatrix4fv), undefined, undefined, Caml_option.some(uniform3f), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state$1);
                              var state$3 = MainStateTool$Wonderjs.setState(state$2);
                              return RenderJobsRenderWorkerTool$Wonderjs.init((function (state) {
                                            return RenderJobsRenderWorkerTool$Wonderjs.render(sandbox, 1, (function (param) {
                                                          return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                              Sinon.getCallCount(uniformMatrix4fv),
                                                                              Sinon.getCallCount(uniform3f)
                                                                            ]), /* tuple */[
                                                                          0,
                                                                          0
                                                                        ]));
                                                        }));
                                          }), state$3);
                            }));
                      return Wonder_jest.testPromise("not drawElements", undefined, (function (param) {
                                    var state$1 = _prepare(sandbox, state[0]);
                                    var drawElements = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                    var state$2 = FakeGlWorkerTool$Wonderjs.setFakeGl(FakeGlWorkerTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(drawElements), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state$1);
                                    var state$3 = MainStateTool$Wonderjs.setState(state$2);
                                    return RenderJobsRenderWorkerTool$Wonderjs.init((function (state) {
                                                  return RenderJobsRenderWorkerTool$Wonderjs.render(sandbox, 1, (function (param) {
                                                                return Promise.resolve(Sinon.toCalled(Wonder_jest.Expect[/* not__ */24](Wonder_jest.Expect[/* expect */0](drawElements))));
                                                              }));
                                                }), state$3);
                                  }));
                    }));
      }));

/*  Not a pure module */
