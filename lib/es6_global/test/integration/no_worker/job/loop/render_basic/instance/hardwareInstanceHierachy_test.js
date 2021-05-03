

import * as Curry from "./../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "./../../../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "./../../../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as TransformAPI$Wonderjs from "../../../../../../../src/api/TransformAPI.js";
import * as GameObjectAPI$Wonderjs from "../../../../../../../src/api/GameObjectAPI.js";
import * as MainStateTool$Wonderjs from "../../../../../../tool/service/state/MainStateTool.js";
import * as RenderJobsTool$Wonderjs from "../../../../../../tool/job/no_worker/loop/RenderJobsTool.js";
import * as LoopRenderJobTool$Wonderjs from "../../../../../../tool/job/no_worker/loop/LoopRenderJobTool.js";
import * as RenderBasicHardwareInstanceTool$Wonderjs from "../../../../../../tool/render/instance/RenderBasicHardwareInstanceTool.js";

Wonder_jest.describe("test hardware instance hierachy", (function (param) {
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
        return Wonder_jest.test("test hierachy transform", (function (param) {
                      var match = RenderBasicHardwareInstanceTool$Wonderjs.createSourceInstanceGameObject(sandbox, state[0]);
                      var match$1 = RenderBasicHardwareInstanceTool$Wonderjs.createSourceInstanceGameObject(sandbox, match[0]);
                      var objectInstanceGameObject2 = match$1[2][4];
                      var state$1 = match$1[0];
                      var sourceTransform1 = GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent(match[1], state$1);
                      var sourceTransform2 = GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent(match$1[1], state$1);
                      var objectInstanceTransform1 = GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent(match[2][4], state$1);
                      var objectInstanceTransform2 = GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent(objectInstanceGameObject2, state$1);
                      var state$2 = TransformAPI$Wonderjs.setTransformParent(sourceTransform1, sourceTransform2, state$1);
                      var state$3 = TransformAPI$Wonderjs.setTransformParent(objectInstanceTransform1, objectInstanceTransform2, state$2);
                      var pos1 = /* tuple */[
                        1,
                        2,
                        3
                      ];
                      var pos2 = /* tuple */[
                        5,
                        10,
                        30
                      ];
                      var state$4 = TransformAPI$Wonderjs.setTransformLocalPosition(objectInstanceTransform1, pos2, TransformAPI$Wonderjs.setTransformLocalPosition(sourceTransform1, pos1, state$3));
                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                      TransformAPI$Wonderjs.getTransformPosition(sourceTransform2, state$4),
                                      TransformAPI$Wonderjs.getTransformPosition(objectInstanceGameObject2, state$4)
                                    ]), /* tuple */[
                                  pos1,
                                  pos2
                                ]);
                    }));
      }));

export {
  
}
/*  Not a pure module */
