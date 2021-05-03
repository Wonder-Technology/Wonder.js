'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Js_option = require("bs-platform/lib/js/js_option.js");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var TestTool$Wonderjs = require("../../../../tool/TestTool.js");
var SettingTool$Wonderjs = require("../../../../tool/service/setting/SettingTool.js");
var LoadDataTool$Wonderjs = require("../../../tool/asset/load/LoadDataTool.js");
var MainStateTool$Wonderjs = require("../../../../tool/service/state/MainStateTool.js");
var TransformTool$Wonderjs = require("../../../../tool/service/transform/TransformTool.js");
var RenderConfigTool$Wonderjs = require("../../../../tool/service/renderConfig/RenderConfigTool.js");
var WorkerJobConfigWorkerTool$Wonderjs = require("../../tool/WorkerJobConfigWorkerTool.js");

Wonder_jest.describe("test load worker data", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var state = /* record */[/* contents */MainStateTool$Wonderjs.createState(/* () */0)];
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                state[0] = TestTool$Wonderjs.init(sandbox, undefined, undefined, /* () */0);
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        return Wonder_jest.describe("test load job config json files", (function (param) {
                      var _buildFakeFetchForWorker = function (sandbox) {
                        var fetch = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                        var match = WorkerJobConfigWorkerTool$Wonderjs.buildWorkerJobConfig(undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                        Sinon.returns(LoadDataTool$Wonderjs.buildFakeFetchJsonResponse(match[6]), Sinon.onCall(7, Sinon.returns(LoadDataTool$Wonderjs.buildFakeFetchJsonResponse(match[3]), Sinon.onCall(6, Sinon.returns(LoadDataTool$Wonderjs.buildFakeFetchJsonResponse(match[5]), Sinon.onCall(5, Sinon.returns(LoadDataTool$Wonderjs.buildFakeFetchJsonResponse(match[4]), Sinon.onCall(4, Sinon.returns(LoadDataTool$Wonderjs.buildFakeFetchJsonResponse(match[2]), Sinon.onCall(3, Sinon.returns(LoadDataTool$Wonderjs.buildFakeFetchJsonResponse(match[1]), Sinon.onCall(2, Sinon.returns(LoadDataTool$Wonderjs.buildFakeFetchJsonResponse(match[0]), Sinon.onCall(1, Sinon.returns(LoadDataTool$Wonderjs.buildFakeFetchJsonResponse(SettingTool$Wonderjs.buildSetting("true", undefined, SettingTool$Wonderjs.buildBufferConfigStr(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), "\n        {\n        \"alpha\": true,\n        \"depth\": true,\n        \"stencil\": false,\n        \"antialias\": true,\n        \"premultiplied_alpha\": true,\n        \"preserve_drawing_buffer\": false\n        }\n               ", "false", "true")), Sinon.onCall(0, fetch))))))))))))))));
                        var match$1 = RenderConfigTool$Wonderjs.buildRenderConfig(undefined, undefined, /* () */0);
                        Sinon.returns(LoadDataTool$Wonderjs.buildFakeFetchJsonResponse(match$1[1]), Sinon.onCall(9, Sinon.returns(LoadDataTool$Wonderjs.buildFakeFetchJsonResponse(match$1[0]), Sinon.onCall(8, fetch))));
                        return fetch;
                      };
                      var _prepareLoadWorkerConfigData = function (param) {
                        var fakeCanvas = {
                          transferControlToOffscreen: 1
                        };
                        var createElementStub = document.createElement;
                        Sinon.returns(fakeCanvas, Sinon.withOneArg("canvas", createElementStub));
                        return /* () */0;
                      };
                      return Wonder_jest.describe("test create record with state", (function (param) {
                                    return Wonder_jest.describe("test create transform record", (function (param) {
                                                  return Wonder_jest.testPromise("should create copiedBuffer", undefined, (function (param) {
                                                                var fetchFunc = _buildFakeFetchForWorker(sandbox);
                                                                _prepareLoadWorkerConfigData(/* () */0);
                                                                return LoadDataTool$Wonderjs.load(/* array */[], fetchFunc, undefined, /* () */0).then((function (param) {
                                                                              var state = MainStateTool$Wonderjs.unsafeGetState(/* () */0);
                                                                              var match = TransformTool$Wonderjs.getRecord(state);
                                                                              return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Js_option.isSome(match[/* copiedBuffer */6])), true));
                                                                            }));
                                                              }));
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
