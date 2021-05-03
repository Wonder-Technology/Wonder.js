'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var FakeGlTool$Wonderjs = require("../../../../tool/gl/FakeGlTool.js");
var GameObjectAPI$Wonderjs = require("../../../../../src/api/GameObjectAPI.js");
var MainStateTool$Wonderjs = require("../../../../tool/service/state/MainStateTool.js");
var GameObjectTool$Wonderjs = require("../../../../tool/service/gameObject/GameObjectTool.js");
var RenderJobsTool$Wonderjs = require("../../../../tool/job/no_worker/loop/RenderJobsTool.js");
var AllMaterialTool$Wonderjs = require("../../../../tool/service/material/AllMaterialTool.js");
var BasicMaterialTool$Wonderjs = require("../../../../tool/service/material/BasicMaterialTool.js");
var LightMaterialTool$Wonderjs = require("../../../../tool/service/material/LightMaterialTool.js");
var LoopRenderJobTool$Wonderjs = require("../../../../tool/job/no_worker/loop/LoopRenderJobTool.js");
var CreateStateMainService$Wonderjs = require("../../../../../src/service/state/main/state/CreateStateMainService.js");

Wonder_jest.describe("test redo,undo material", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var state = /* record */[/* contents */CreateStateMainService$Wonderjs.createState(/* () */0)];
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                state[0] = RenderJobsTool$Wonderjs.initWithJobConfig(sandbox, LoopRenderJobTool$Wonderjs.buildNoWorkerJobConfig(/* () */0));
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        return Wonder_jest.describe("fix bug", (function (param) {
                      return Wonder_jest.describe("create material1;\n            dispose material1;\n            create material2;\n            deep copy;\n            create material3;\n            restore;\n\n            material3 should need init", (function (param) {
                                    Wonder_jest.test("test light material", (function (param) {
                                            var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state[0]);
                                            var state$2 = AllMaterialTool$Wonderjs.prepareForInit(state$1);
                                            var match = LightMaterialTool$Wonderjs.createGameObject(state$2);
                                            var gameObject1 = match[1];
                                            var state$3 = GameObjectAPI$Wonderjs.initGameObject(gameObject1, match[0]);
                                            var state$4 = GameObjectTool$Wonderjs.disposeGameObjectLightMaterialComponent(gameObject1, match[2], state$3);
                                            var copiedState = MainStateTool$Wonderjs.deepCopyForRestore(state$4);
                                            var match$1 = LightMaterialTool$Wonderjs.createGameObject(state$4);
                                            var state$5 = GameObjectAPI$Wonderjs.initGameObject(match$1[1], match$1[0]);
                                            var restoredState = MainStateTool$Wonderjs.restore(state$5, copiedState);
                                            var match$2 = LightMaterialTool$Wonderjs.createGameObject(restoredState);
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](LightMaterialTool$Wonderjs.isNeedInitMaterial(match$2[2], state$5)), true);
                                          }));
                                    return Wonder_jest.test("test basic material", (function (param) {
                                                  var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state[0]);
                                                  var state$2 = AllMaterialTool$Wonderjs.prepareForInit(state$1);
                                                  var match = BasicMaterialTool$Wonderjs.createGameObject(state$2);
                                                  var gameObject1 = match[1];
                                                  var state$3 = GameObjectAPI$Wonderjs.initGameObject(gameObject1, match[0]);
                                                  var state$4 = GameObjectTool$Wonderjs.disposeGameObjectBasicMaterialComponent(gameObject1, match[2], state$3);
                                                  var copiedState = MainStateTool$Wonderjs.deepCopyForRestore(state$4);
                                                  var match$1 = BasicMaterialTool$Wonderjs.createGameObject(state$4);
                                                  var state$5 = GameObjectAPI$Wonderjs.initGameObject(match$1[1], match$1[0]);
                                                  var restoredState = MainStateTool$Wonderjs.restore(state$5, copiedState);
                                                  var match$2 = BasicMaterialTool$Wonderjs.createGameObject(restoredState);
                                                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](BasicMaterialTool$Wonderjs.isNeedInitMaterial(match$2[2], state$5)), true);
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
