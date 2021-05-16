'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var StateAPI$Wonderjs = require("../../../../../src/api/StateAPI.js");
var TestTool$Wonderjs = require("../../../../tool/TestTool.js");
var CameraTool$Wonderjs = require("../../../../tool/service/camera/CameraTool.js");
var FakeGlTool$Wonderjs = require("../../../../tool/gl/FakeGlTool.js");
var DirectorTool$Wonderjs = require("../../../../tool/core/DirectorTool.js");
var GameObjectAPI$Wonderjs = require("../../../../../src/api/GameObjectAPI.js");
var MainStateTool$Wonderjs = require("../../../../tool/service/state/MainStateTool.js");
var GameObjectTool$Wonderjs = require("../../../../tool/service/gameObject/GameObjectTool.js");
var RenderJobsTool$Wonderjs = require("../../../../tool/job/no_worker/loop/RenderJobsTool.js");
var AllMaterialTool$Wonderjs = require("../../../../tool/service/material/AllMaterialTool.js");
var BoxGeometryTool$Wonderjs = require("../../../../tool/service/geometry/BoxGeometryTool.js");
var LoopRenderJobTool$Wonderjs = require("../../../../tool/job/no_worker/loop/LoopRenderJobTool.js");
var FrontRenderLightJobTool$Wonderjs = require("../../../../tool/job/no_worker/loop/FrontRenderLightJobTool.js");

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

/*  Not a pure module */
