

import * as Curry from "./../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "./../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Js_option from "./../../../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as Wonder_jest from "./../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as TestTool$Wonderjs from "../../../../tool/TestTool.js";
import * as SettingTool$Wonderjs from "../../../../tool/service/setting/SettingTool.js";
import * as LoadDataTool$Wonderjs from "../../../tool/asset/load/LoadDataTool.js";
import * as MainStateTool$Wonderjs from "../../../../tool/service/state/MainStateTool.js";
import * as TransformTool$Wonderjs from "../../../../tool/service/transform/TransformTool.js";
import * as RenderConfigTool$Wonderjs from "../../../../tool/service/renderConfig/RenderConfigTool.js";
import * as WorkerJobConfigWorkerTool$Wonderjs from "../../tool/WorkerJobConfigWorkerTool.js";

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

export {
  
}
/*  Not a pure module */
