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

describe("SceneAPI", (function () {
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
        describe("addSceneChild", (function () {
                return Wonder_jest.test("add child gameObject to sceneGameObject", (function () {
                              var match = GameObjectTool$Wonderjs.createGameObject(state[0]);
                              var state$1 = SceneAPI$Wonderjs.addSceneChild(match[1], match[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](TransformAPI$Wonderjs.unsafeGetTransformChildren(GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent(SceneAPI$Wonderjs.getSceneGameObject(state$1), state$1), state$1)), /* array */[match[2]]);
                            }));
              }));
        describe("addSceneChildren", (function () {
                return Wonder_jest.test("add children gameObject arr to sceneGameObject", (function () {
                              var match = GameObjectTool$Wonderjs.createGameObject(state[0]);
                              var match$1 = GameObjectTool$Wonderjs.createGameObject(match[0]);
                              var state$1 = SceneAPI$Wonderjs.addSceneChildren(/* array */[
                                    match[1],
                                    match$1[1]
                                  ], match$1[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](TransformAPI$Wonderjs.unsafeGetTransformChildren(GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent(SceneAPI$Wonderjs.getSceneGameObject(state$1), state$1), state$1)), /* array */[
                                          match[2],
                                          match$1[2]
                                        ]);
                            }));
              }));
        describe("setSceneGameObject", (function () {
                return Wonder_jest.test("test", (function () {
                              var match = GameObjectAPI$Wonderjs.createGameObject(state[0]);
                              var match$1 = GameObjectAPI$Wonderjs.createGameObject(match[0]);
                              var gameObject2 = match$1[1];
                              var state$1 = SceneAPI$Wonderjs.setSceneGameObject(gameObject2, match$1[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](SceneAPI$Wonderjs.getSceneGameObject(state$1)), gameObject2);
                            }));
              }));
        return /* () */0;
      }));

/*  Not a pure module */
