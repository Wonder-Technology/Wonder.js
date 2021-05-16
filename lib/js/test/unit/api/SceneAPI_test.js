'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var SceneAPI$Wonderjs = require("../../../src/api/SceneAPI.js");
var TestTool$Wonderjs = require("../../tool/TestTool.js");
var TransformAPI$Wonderjs = require("../../../src/api/TransformAPI.js");
var GameObjectAPI$Wonderjs = require("../../../src/api/GameObjectAPI.js");
var GameObjectTool$Wonderjs = require("../../tool/service/gameObject/GameObjectTool.js");
var CreateStateMainService$Wonderjs = require("../../../src/service/state/main/state/CreateStateMainService.js");

Wonder_jest.describe("SceneAPI", (function (param) {
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
        Wonder_jest.describe("addSceneChild", (function (param) {
                return Wonder_jest.test("add child gameObject to sceneGameObject", (function (param) {
                              var match = GameObjectTool$Wonderjs.createGameObject(state[0]);
                              var state$1 = SceneAPI$Wonderjs.addSceneChild(match[1], match[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](TransformAPI$Wonderjs.unsafeGetTransformChildren(GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent(SceneAPI$Wonderjs.getSceneGameObject(state$1), state$1), state$1)), /* array */[match[2]]);
                            }));
              }));
        Wonder_jest.describe("addSceneChildren", (function (param) {
                return Wonder_jest.test("add children gameObject arr to sceneGameObject", (function (param) {
                              var match = GameObjectTool$Wonderjs.createGameObject(state[0]);
                              var match$1 = GameObjectTool$Wonderjs.createGameObject(match[0]);
                              var state$1 = SceneAPI$Wonderjs.addSceneChildren(/* array */[
                                    match[1],
                                    match$1[1]
                                  ], match$1[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](TransformAPI$Wonderjs.unsafeGetTransformChildren(GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent(SceneAPI$Wonderjs.getSceneGameObject(state$1), state$1), state$1)), /* array */[
                                          match[2],
                                          match$1[2]
                                        ]);
                            }));
              }));
        Wonder_jest.describe("setSceneGameObject", (function (param) {
                return Wonder_jest.test("test", (function (param) {
                              var match = GameObjectAPI$Wonderjs.createGameObject(state[0]);
                              var match$1 = GameObjectAPI$Wonderjs.createGameObject(match[0]);
                              var gameObject2 = match$1[1];
                              var state$1 = SceneAPI$Wonderjs.setSceneGameObject(gameObject2, match$1[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](SceneAPI$Wonderjs.getSceneGameObject(state$1)), gameObject2);
                            }));
              }));
        return Wonder_jest.describe("findGameObjectsByName", (function (param) {
                      return Wonder_jest.test("find gameObjects by name in scene", (function (param) {
                                    var match = GameObjectAPI$Wonderjs.createGameObject(state[0]);
                                    var gameObject1 = match[1];
                                    var match$1 = GameObjectAPI$Wonderjs.createGameObject(match[0]);
                                    var gameObject2 = match$1[1];
                                    var name2 = "bbb";
                                    var state$1 = GameObjectAPI$Wonderjs.setGameObjectName(gameObject2, name2, GameObjectAPI$Wonderjs.setGameObjectName(gameObject1, "aaa", match$1[0]));
                                    var state$2 = SceneAPI$Wonderjs.addSceneChildren(/* array */[
                                          gameObject1,
                                          gameObject2
                                        ], state$1);
                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](SceneAPI$Wonderjs.findGameObjectsByName(name2, state$2)), /* array */[gameObject2]);
                                  }));
                    }));
      }));

/*  Not a pure module */
