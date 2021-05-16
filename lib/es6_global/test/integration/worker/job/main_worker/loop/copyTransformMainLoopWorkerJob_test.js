

import * as Sinon from "../../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Caml_option from "../../../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as Wonder_jest from "../../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as SettingTool$Wonderjs from "../../../../../tool/service/setting/SettingTool.js";
import * as TransformAPI$Wonderjs from "../../../../../../src/api/TransformAPI.js";
import * as MainStateTool$Wonderjs from "../../../../../tool/service/state/MainStateTool.js";
import * as TransformTool$Wonderjs from "../../../../../tool/service/transform/TransformTool.js";
import * as GLSLSenderTool$Wonderjs from "../../../../../tool/service/sender/GLSLSenderTool.js";
import * as TestWorkerTool$Wonderjs from "../../../tool/TestWorkerTool.js";
import * as FakeGlWorkerTool$Wonderjs from "../../../tool/FakeGlWorkerTool.js";
import * as GLSLLocationTool$Wonderjs from "../../../../../tool/service/location/GLSLLocationTool.js";
import * as RenderBasicJobTool$Wonderjs from "../../../../../tool/job/render_basic/RenderBasicJobTool.js";
import * as TestMainWorkerTool$Wonderjs from "../tool/TestMainWorkerTool.js";
import * as RenderJobsRenderWorkerTool$Wonderjs from "../../render_worker/tool/RenderJobsRenderWorkerTool.js";

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

export {
  
}
/*  Not a pure module */
