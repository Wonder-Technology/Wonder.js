

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as Js_primitive from "../../../../../../../node_modules/bs-platform/lib/es6/js_primitive.js";
import * as CameraTool$Wonderjs from "../../../../tool/service/camera/CameraTool.js";
import * as SettingTool$Wonderjs from "../../../../tool/service/setting/SettingTool.js";
import * as MainStateTool$Wonderjs from "../../../../tool/service/state/MainStateTool.js";
import * as TestWorkerTool$Wonderjs from "../../tool/TestWorkerTool.js";
import * as FakeGlWorkerTool$Wonderjs from "../../tool/FakeGlWorkerTool.js";
import * as RenderBasicJobTool$Wonderjs from "../../../../tool/job/render_basic/RenderBasicJobTool.js";
import * as TestMainWorkerTool$Wonderjs from "./tool/TestMainWorkerTool.js";
import * as RenderJobsRenderWorkerTool$Wonderjs from "../render_worker/tool/RenderJobsRenderWorkerTool.js";

describe("test render before exec main loop jobs", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var state = /* record */[/* contents */MainStateTool$Wonderjs.createState(/* () */0)];
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                state[0] = TestMainWorkerTool$Wonderjs.initWithJobConfig(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, SettingTool$Wonderjs.buildBufferConfigStr(undefined, undefined, 5, 5, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), /* () */0);
                return /* () */0;
              }));
        afterEach((function () {
                return TestWorkerTool$Wonderjs.clear(sandbox);
              }));
        describe("not render in render worker in the first frame", (function () {
                var _prepare = function (sandbox, state) {
                  var match = RenderBasicJobTool$Wonderjs.prepareGameObject(sandbox, state);
                  return CameraTool$Wonderjs.createCameraGameObject(match[0])[0];
                };
                Wonder_jest.testPromise("not send uniform data", (function () {
                        var state$1 = _prepare(sandbox, state[0]);
                        var uniformMatrix4fv = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                        var uniform3f = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                        var state$2 = FakeGlWorkerTool$Wonderjs.setFakeGl(FakeGlWorkerTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(uniformMatrix4fv), undefined, undefined, Js_primitive.some(uniform3f), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state$1);
                        var state$3 = MainStateTool$Wonderjs.setState(state$2);
                        return RenderJobsRenderWorkerTool$Wonderjs.init((function () {
                                      return RenderJobsRenderWorkerTool$Wonderjs.render(sandbox, 1, (function () {
                                                    return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                        Sinon.getCallCount(uniformMatrix4fv),
                                                                        Sinon.getCallCount(uniform3f)
                                                                      ]), /* tuple */[
                                                                    0,
                                                                    0
                                                                  ]));
                                                  }));
                                    }), state$3);
                      }));
                return Wonder_jest.testPromise("not drawElements", (function () {
                              var state$1 = _prepare(sandbox, state[0]);
                              var drawElements = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                              var state$2 = FakeGlWorkerTool$Wonderjs.setFakeGl(FakeGlWorkerTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(drawElements), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state$1);
                              var state$3 = MainStateTool$Wonderjs.setState(state$2);
                              return RenderJobsRenderWorkerTool$Wonderjs.init((function () {
                                            return RenderJobsRenderWorkerTool$Wonderjs.render(sandbox, 1, (function () {
                                                          return Promise.resolve(Sinon.toCalled(Wonder_jest.Expect[/* not_ */22](Wonder_jest.Expect[/* expect */0](drawElements))));
                                                        }));
                                          }), state$3);
                            }));
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
