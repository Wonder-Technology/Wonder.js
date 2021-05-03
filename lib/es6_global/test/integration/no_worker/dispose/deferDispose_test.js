

import * as Curry from "./../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "./../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Caml_option from "./../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as Wonder_jest from "./../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as CameraTool$Wonderjs from "../../../tool/service/camera/CameraTool.js";
import * as FakeGlTool$Wonderjs from "../../../tool/gl/FakeGlTool.js";
import * as DirectorTool$Wonderjs from "../../../tool/core/DirectorTool.js";
import * as TransformAPI$Wonderjs from "../../../../src/api/TransformAPI.js";
import * as GameObjectAPI$Wonderjs from "../../../../src/api/GameObjectAPI.js";
import * as MainStateTool$Wonderjs from "../../../tool/service/state/MainStateTool.js";
import * as TransformTool$Wonderjs from "../../../tool/service/transform/TransformTool.js";
import * as RenderJobsTool$Wonderjs from "../../../tool/job/no_worker/loop/RenderJobsTool.js";
import * as GLSLLocationTool$Wonderjs from "../../../tool/service/location/GLSLLocationTool.js";
import * as LoopRenderJobTool$Wonderjs from "../../../tool/job/no_worker/loop/LoopRenderJobTool.js";
import * as RenderBasicJobTool$Wonderjs from "../../../tool/job/render_basic/RenderBasicJobTool.js";

Wonder_jest.describe("test defer dispose", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var state = /* record */[/* contents */MainStateTool$Wonderjs.createState(/* () */0)];
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                state[0] = RenderJobsTool$Wonderjs.initWithJobConfig(sandbox, LoopRenderJobTool$Wonderjs.buildNoWorkerJobConfig(/* () */0));
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        return Wonder_jest.describe("defer dispose to the time which before update_transform job", (function (param) {
                      return Wonder_jest.describe("test defer batch dispose gameObject", (function (param) {
                                    Wonder_jest.test("dispose before update_transform", (function (param) {
                                            var match = RenderBasicJobTool$Wonderjs.prepareGameObject(sandbox, state[0]);
                                            var gameObject1 = match[1];
                                            var state$1 = match[0];
                                            var transform1 = GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent(gameObject1, state$1);
                                            var match$1 = RenderBasicJobTool$Wonderjs.prepareGameObject(sandbox, state$1);
                                            var state$2 = match$1[0];
                                            var transform2 = GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent(match$1[1], state$2);
                                            var match$2 = CameraTool$Wonderjs.createCameraGameObject(state$2);
                                            var state$3 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match$2[0]);
                                            var state$4 = TransformAPI$Wonderjs.setTransformLocalPosition(transform2, /* tuple */[
                                                  4,
                                                  5,
                                                  6
                                                ], TransformAPI$Wonderjs.setTransformLocalPosition(transform1, /* tuple */[
                                                      1,
                                                      2,
                                                      3
                                                    ], TransformAPI$Wonderjs.setTransformParent(transform1, transform2, state$3)));
                                            var state$5 = GameObjectAPI$Wonderjs.batchDisposeGameObject(/* array */[gameObject1], state$4);
                                            var state$6 = DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$5));
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](TransformTool$Wonderjs.getLocalToWorldMatrixTypeArray(transform2, state$6)), new Float32Array(/* array */[
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
                                                            4,
                                                            5,
                                                            6,
                                                            1
                                                          ]));
                                          }));
                                    return Wonder_jest.describe("dispose before render", (function (param) {
                                                  return Wonder_jest.test("not send disposed one's uniform data", (function (param) {
                                                                var match = RenderBasicJobTool$Wonderjs.prepareGameObject(sandbox, state[0]);
                                                                var gameObject1 = match[1];
                                                                var state$1 = match[0];
                                                                var transform1 = GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent(gameObject1, state$1);
                                                                var match$1 = RenderBasicJobTool$Wonderjs.prepareGameObject(sandbox, state$1);
                                                                var state$2 = match$1[0];
                                                                var transform2 = GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent(match$1[1], state$2);
                                                                var match$2 = CameraTool$Wonderjs.createCameraGameObject(state$2);
                                                                var uniformMatrix4fv = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                                var getUniformLocation = GLSLLocationTool$Wonderjs.getUniformLocation(0, sandbox, "u_mMatrix");
                                                                var state$3 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(getUniformLocation), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(uniformMatrix4fv), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match$2[0]);
                                                                var state$4 = TransformAPI$Wonderjs.setTransformLocalPosition(transform2, /* tuple */[
                                                                      4,
                                                                      5,
                                                                      6
                                                                    ], TransformAPI$Wonderjs.setTransformLocalPosition(transform1, /* tuple */[
                                                                          1,
                                                                          2,
                                                                          3
                                                                        ], TransformAPI$Wonderjs.setTransformParent(transform1, transform2, state$3)));
                                                                var state$5 = GameObjectAPI$Wonderjs.batchDisposeGameObject(/* array */[gameObject1], state$4);
                                                                DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$5));
                                                                return Sinon.toCalledWith(/* array */[
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
                                                                          ], Wonder_jest.Expect[/* not__ */24](Wonder_jest.Expect[/* expect */0](uniformMatrix4fv)));
                                                              }));
                                                }));
                                  }));
                    }));
      }));

export {
  
}
/*  Not a pure module */
