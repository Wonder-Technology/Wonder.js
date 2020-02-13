'use strict';

var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var SettingTool$Wonderjs = require("../../../../../tool/service/setting/SettingTool.js");
var TransformAPI$Wonderjs = require("../../../../../../src/api/TransformAPI.js");
var MainStateTool$Wonderjs = require("../../../../../tool/service/state/MainStateTool.js");
var TransformTool$Wonderjs = require("../../../../../tool/service/transform/TransformTool.js");
var GLSLSenderTool$Wonderjs = require("../../../../../tool/service/sender/GLSLSenderTool.js");
var TestWorkerTool$Wonderjs = require("../../../tool/TestWorkerTool.js");
var FakeGlWorkerTool$Wonderjs = require("../../../tool/FakeGlWorkerTool.js");
var GLSLLocationTool$Wonderjs = require("../../../../../tool/service/location/GLSLLocationTool.js");
var RenderBasicJobTool$Wonderjs = require("../../../../../tool/job/render_basic/RenderBasicJobTool.js");
var TestMainWorkerTool$Wonderjs = require("../tool/TestMainWorkerTool.js");
var RenderJobsRenderWorkerTool$Wonderjs = require("../../render_worker/tool/RenderJobsRenderWorkerTool.js");

Wonder_jest.describe("test copy transform main worker job", (function (param) {
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
        return Wonder_jest.describe("if change transform data in main worker during render in render worker, the transform data in render worker shouldn't change", (function (param) {
                      return Wonder_jest.testPromise("test localToWorldMatrix", undefined, (function (param) {
                                    var match = GLSLSenderTool$Wonderjs.JudgeSendUniformData[/* prepareSendUniformData */0](sandbox, RenderBasicJobTool$Wonderjs.prepareGameObject, state[0]);
                                    var gameObjectTransform = match[2][0];
                                    var state$1 = TransformAPI$Wonderjs.setTransformLocalPosition(gameObjectTransform, /* tuple */[
                                          1,
                                          2,
                                          3
                                        ], match[0]);
                                    var uniformMatrix4fv = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                    var getUniformLocation = GLSLLocationTool$Wonderjs.getUniformLocation(0, sandbox, "u_mMatrix");
                                    var state$2 = FakeGlWorkerTool$Wonderjs.setFakeGl(FakeGlWorkerTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(getUniformLocation), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(uniformMatrix4fv), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state$1);
                                    var state$3 = MainStateTool$Wonderjs.setState(state$2);
                                    return RenderJobsRenderWorkerTool$Wonderjs.initAndMainLoopAndRender((function (param) {
                                                  return Promise.resolve(Sinon.toCalledWith(/* array */[
                                                                  0,
                                                                  false,
                                                                  new Float32Array(/* array */[
                                                                        1,
                                                                        0,
                                                                        0,
                                                                        0,
                                                                        0,
                                                                        1,
                                                                        0,
                                                                        0,
                                                                        0,
                                                                        0,
                                                                        1,
                                                                        0,
                                                                        1,
                                                                        2,
                                                                        3,
                                                                        1
                                                                      ])
                                                                ], Wonder_jest.Expect[/* expect */0](Sinon.withOneArg(0, uniformMatrix4fv))));
                                                }), state$3, sandbox, (function (param) {
                                                  MainStateTool$Wonderjs.setState(TransformTool$Wonderjs.update(gameObjectTransform, TransformAPI$Wonderjs.setTransformLocalPosition(gameObjectTransform, /* tuple */[
                                                                10,
                                                                1,
                                                                2
                                                              ], MainStateTool$Wonderjs.unsafeGetState(/* () */0))));
                                                  return /* () */0;
                                                }), /* () */0);
                                  }));
                    }));
      }));

/*  Not a pure module */
