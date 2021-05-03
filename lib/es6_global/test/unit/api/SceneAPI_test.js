

import * as Curry from "./../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "./../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "./../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as SceneAPI$Wonderjs from "../../../src/api/SceneAPI.js";
import * as TestTool$Wonderjs from "../../tool/TestTool.js";
import * as TransformAPI$Wonderjs from "../../../src/api/TransformAPI.js";
import * as GameObjectAPI$Wonderjs from "../../../src/api/GameObjectAPI.js";
import * as GameObjectTool$Wonderjs from "../../tool/service/gameObject/GameObjectTool.js";
import * as CreateStateMainService$Wonderjs from "../../../src/service/state/main/state/CreateStateMainService.js";

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

export {
  
}
/*  Not a pure module */
