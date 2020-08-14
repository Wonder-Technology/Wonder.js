'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var SceneAPI$Wonderjs = require("../../../src/api/SceneAPI.js");
var TestTool$Wonderjs = require("../../tool/TestTool.js");
var FakeGlTool$Wonderjs = require("../../tool/gl/FakeGlTool.js");
var GameObjectAPI$Wonderjs = require("../../../src/api/GameObjectAPI.js");
var GameObjectTool$Wonderjs = require("../../tool/service/gameObject/GameObjectTool.js");
var ImportABSystem$Wonderjs = require("../../../src/asset_bundle/import/ImportABSystem.js");
var AllMaterialTool$Wonderjs = require("../../tool/service/material/AllMaterialTool.js");
var NoWorkerJobConfigTool$Wonderjs = require("../../tool/service/noWorkerJob/NoWorkerJobConfigTool.js");
var CreateStateMainService$Wonderjs = require("../../../src/service/state/main/state/CreateStateMainService.js");
var InitLightMaterialJobTool$Wonderjs = require("../../tool/job/no_worker/init/InitLightMaterialJobTool.js");

Wonder_jest.describe("ImportABSystem", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var state = /* record */[/* contents */CreateStateMainService$Wonderjs.createState(/* () */0)];
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                state[0] = TestTool$Wonderjs.init(sandbox, undefined, undefined, /* () */0);
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        Wonder_jest.describe("setSABSceneGameObjectToBeScene", (function (param) {
                return Wonder_jest.test("set sab->scene gameObject to be scene", (function (param) {
                              var match = GameObjectAPI$Wonderjs.createGameObject(state[0]);
                              var gameObject = match[1];
                              var state$1 = ImportABSystem$Wonderjs.setSABSceneGameObjectToBeScene(gameObject, match[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](SceneAPI$Wonderjs.getSceneGameObject(state$1)), gameObject);
                            }));
              }));
        Wonder_jest.describe("initAllSABGameObjects", (function (param) {
                beforeEach((function () {
                        state[0] = TestTool$Wonderjs.initWithJobConfigWithoutBuildFakeDom(sandbox, undefined, undefined, undefined, undefined, undefined, NoWorkerJobConfigTool$Wonderjs.buildNoWorkerJobConfig(undefined, undefined, undefined, undefined, undefined, /* () */0), undefined, /* () */0);
                        return /* () */0;
                      }));
                return Wonder_jest.test("init all sab->gameObjects", (function (param) {
                              var match = InitLightMaterialJobTool$Wonderjs.prepareGameObject(sandbox, state[0]);
                              var gameObject1 = match[1];
                              var match$1 = InitLightMaterialJobTool$Wonderjs.prepareGameObject(sandbox, match[0]);
                              var state$1 = GameObjectTool$Wonderjs.addChild(gameObject1, match$1[1], match$1[0]);
                              var attachShader = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                              var state$2 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(attachShader), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state$1);
                              var state$3 = AllMaterialTool$Wonderjs.prepareForInit(state$2);
                              ImportABSystem$Wonderjs.initAllSABGameObjects(gameObject1, state$3);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(attachShader)), 2);
                            }));
              }));
        Wonder_jest.describe("addSABSceneGameObjectChildrenToScene", (function (param) {
                return Wonder_jest.test("add sab->scene gameObject->children to scene", (function (param) {
                              var match = GameObjectAPI$Wonderjs.createGameObject(state[0]);
                              var gameObject1 = match[1];
                              var match$1 = GameObjectAPI$Wonderjs.createGameObject(match[0]);
                              var gameObject2 = match$1[1];
                              var state$1 = GameObjectTool$Wonderjs.addChild(gameObject1, gameObject2, match$1[0]);
                              var match$2 = GameObjectAPI$Wonderjs.createGameObject(state$1);
                              var gameObject3 = match$2[1];
                              var state$2 = SceneAPI$Wonderjs.addSceneChild(gameObject3, match$2[0]);
                              var state$3 = ImportABSystem$Wonderjs.addSABSceneGameObjectChildrenToScene(gameObject1, state$2);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](GameObjectTool$Wonderjs.getChildren(SceneAPI$Wonderjs.getSceneGameObject(state$3), state$3)), /* array */[
                                          gameObject3,
                                          gameObject2
                                        ]);
                            }));
              }));
        return Wonder_jest.describe("disposeSceneAllChildren", (function (param) {
                      return Wonder_jest.test("dispose all scene->children", (function (param) {
                                    var match = GameObjectAPI$Wonderjs.createGameObject(state[0]);
                                    var gameObject1 = match[1];
                                    var match$1 = GameObjectAPI$Wonderjs.createGameObject(match[0]);
                                    var gameObject2 = match$1[1];
                                    var state$1 = GameObjectTool$Wonderjs.addChild(gameObject1, gameObject2, match$1[0]);
                                    var match$2 = GameObjectAPI$Wonderjs.createGameObject(state$1);
                                    var gameObject3 = match$2[1];
                                    var state$2 = SceneAPI$Wonderjs.addSceneChildren(/* array */[
                                          gameObject3,
                                          gameObject1
                                        ], match$2[0]);
                                    var state$3 = ImportABSystem$Wonderjs.disposeSceneAllChildren(state$2);
                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                    GameObjectTool$Wonderjs.isDeferDisposed(gameObject1, state$3),
                                                    GameObjectTool$Wonderjs.isDeferDisposed(gameObject2, state$3),
                                                    GameObjectTool$Wonderjs.isDeferDisposed(gameObject3, state$3)
                                                  ]), /* tuple */[
                                                true,
                                                true,
                                                true
                                              ]);
                                  }));
                    }));
      }));

/*  Not a pure module */
