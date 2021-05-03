

import * as Curry from "./../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "./../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Caml_option from "./../../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as Wonder_jest from "./../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as StateAPI$Wonderjs from "../../../../../src/api/StateAPI.js";
import * as TestTool$Wonderjs from "../../../../tool/TestTool.js";
import * as CameraTool$Wonderjs from "../../../../tool/service/camera/CameraTool.js";
import * as FakeGlTool$Wonderjs from "../../../../tool/gl/FakeGlTool.js";
import * as DirectorTool$Wonderjs from "../../../../tool/core/DirectorTool.js";
import * as GameObjectAPI$Wonderjs from "../../../../../src/api/GameObjectAPI.js";
import * as MainStateTool$Wonderjs from "../../../../tool/service/state/MainStateTool.js";
import * as GameObjectTool$Wonderjs from "../../../../tool/service/gameObject/GameObjectTool.js";
import * as RenderJobsTool$Wonderjs from "../../../../tool/job/no_worker/loop/RenderJobsTool.js";
import * as AllMaterialTool$Wonderjs from "../../../../tool/service/material/AllMaterialTool.js";
import * as BoxGeometryTool$Wonderjs from "../../../../tool/service/geometry/BoxGeometryTool.js";
import * as LoopRenderJobTool$Wonderjs from "../../../../tool/job/no_worker/loop/LoopRenderJobTool.js";
import * as FrontRenderLightJobTool$Wonderjs from "../../../../tool/job/no_worker/loop/FrontRenderLightJobTool.js";

Wonder_jest.describe("fix redo,undo bug", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        Wonder_jest.test("1.create box1; 2.get copied state by deepCopyForRestore; 3.dispose box1; 4.add box2;\n        the box1's vertices from copied state is wrong!", (function (param) {
                var state = TestTool$Wonderjs.initWithJobConfig(sandbox, undefined, undefined, undefined, undefined, undefined, /* () */0);
                var match = BoxGeometryTool$Wonderjs.createGameObject(state);
                var boxGameObject = match[1];
                var state$1 = GameObjectAPI$Wonderjs.initGameObject(boxGameObject, match[0]);
                var state$2 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state$1);
                var copiedState = StateAPI$Wonderjs.deepCopyForRestore(state$2);
                var state$3 = GameObjectTool$Wonderjs.disposeGameObject(boxGameObject, state$2);
                var match$1 = BoxGeometryTool$Wonderjs.createGameObject(state$3);
                GameObjectAPI$Wonderjs.initGameObject(match$1[1], match$1[0]);
                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](BoxGeometryTool$Wonderjs.getBoxGeometryVertices(copiedState)), BoxGeometryTool$Wonderjs.getDefaultVertices(/* () */0));
              }));
        return Wonder_jest.test("1.create box1 with map1;2.init and loop;3.get copied state by deepCopyForRestore;4.create box2 with map2;5.loop;6.restore;7.loop.\n        should bind the box1->map1 in the last loop!\n          ", (function (param) {
                      var state = RenderJobsTool$Wonderjs.initWithJobConfig(sandbox, LoopRenderJobTool$Wonderjs.buildNoWorkerJobConfig(/* () */0));
                      var match = CameraTool$Wonderjs.createCameraGameObject(state);
                      var match$1 = FrontRenderLightJobTool$Wonderjs.prepareGameObjectWithCreatedDiffuseMap(sandbox, match[0]);
                      var state$1 = AllMaterialTool$Wonderjs.pregetGLSLData(match$1[0]);
                      var bindTexture = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                      var state$2 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(bindTexture), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state$1);
                      var state$3 = DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$2));
                      var copiedState = StateAPI$Wonderjs.deepCopyForRestore(state$3);
                      var match$2 = FrontRenderLightJobTool$Wonderjs.prepareGameObjectWithCreatedDiffuseMap(sandbox, state$3);
                      var state$4 = GameObjectAPI$Wonderjs.initGameObject(match$2[1], match$2[0]);
                      var state$5 = DirectorTool$Wonderjs.runWithDefaultTime(state$4);
                      var bindTextureCallCount = Sinon.getCallCount(bindTexture);
                      var restoredState = MainStateTool$Wonderjs.restore(state$5, copiedState);
                      DirectorTool$Wonderjs.runWithDefaultTime(restoredState);
                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(bindTexture)), bindTextureCallCount + 1 | 0);
                    }));
      }));

export {
  
}
/*  Not a pure module */
