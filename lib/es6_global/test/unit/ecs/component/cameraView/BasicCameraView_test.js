

import * as Curry from "./../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "./../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "./../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as TestTool$Wonderjs from "../../../../tool/TestTool.js";
import * as CameraTool$Wonderjs from "../../../../tool/service/camera/CameraTool.js";
import * as GameObjectAPI$Wonderjs from "../../../../../src/api/GameObjectAPI.js";
import * as MainStateTool$Wonderjs from "../../../../tool/service/state/MainStateTool.js";
import * as GameObjectTool$Wonderjs from "../../../../tool/service/gameObject/GameObjectTool.js";
import * as BasicCameraViewAPI$Wonderjs from "../../../../../src/api/camera/BasicCameraViewAPI.js";
import * as MutableSparseMapService$WonderCommonlib from "./../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";

Wonder_jest.describe("BasicCameraView", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var state = /* record */[/* contents */MainStateTool$Wonderjs.createState(/* () */0)];
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                state[0] = TestTool$Wonderjs.init(sandbox, undefined, undefined, /* () */0);
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        Wonder_jest.describe("createBasicCameraView", (function (param) {
                Wonder_jest.test("create a new camera which is just index(int)", (function (param) {
                        var match = BasicCameraViewAPI$Wonderjs.createBasicCameraView(state[0]);
                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](match[1]), 0);
                      }));
                return Wonder_jest.describe("change state", (function (param) {
                              return Wonder_jest.test("state->index + 1", (function (param) {
                                            var match = BasicCameraViewAPI$Wonderjs.createBasicCameraView(state[0]);
                                            var record = match[0][/* basicCameraViewRecord */13];
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](record[/* index */0]), 1);
                                          }));
                            }));
              }));
        Wonder_jest.describe("unsafeGetBasicCameraViewGameObject", (function (param) {
                return Wonder_jest.test("get cameraView's gameObject", (function (param) {
                              var match = BasicCameraViewAPI$Wonderjs.createBasicCameraView(state[0]);
                              var cameraView = match[1];
                              var match$1 = GameObjectAPI$Wonderjs.createGameObject(match[0]);
                              var gameObject = match$1[1];
                              var state$1 = GameObjectAPI$Wonderjs.addGameObjectBasicCameraViewComponent(gameObject, cameraView, match$1[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](BasicCameraViewAPI$Wonderjs.unsafeGetBasicCameraViewGameObject(cameraView, state$1)), gameObject);
                            }));
              }));
        Wonder_jest.describe("isActiveBasicCameraView", (function (param) {
                return Wonder_jest.test("test", (function (param) {
                              var match = BasicCameraViewAPI$Wonderjs.createBasicCameraView(state[0]);
                              var cameraView = match[1];
                              var state$1 = BasicCameraViewAPI$Wonderjs.setActiveBasicCameraView(cameraView, false, match[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](BasicCameraViewAPI$Wonderjs.isActiveBasicCameraView(cameraView, state$1)), false);
                            }));
              }));
        Wonder_jest.describe("activeBasicCameraView", (function (param) {
                return Wonder_jest.describe("ensure only has one active basicCameraView", (function (param) {
                              return Wonder_jest.test("active this one, unactive other ones", (function (param) {
                                            var match = BasicCameraViewAPI$Wonderjs.createBasicCameraView(state[0]);
                                            var cameraView1 = match[1];
                                            var match$1 = BasicCameraViewAPI$Wonderjs.createBasicCameraView(match[0]);
                                            var cameraView2 = match$1[1];
                                            var match$2 = BasicCameraViewAPI$Wonderjs.createBasicCameraView(match$1[0]);
                                            var cameraView3 = match$2[1];
                                            var state$1 = BasicCameraViewAPI$Wonderjs.activeBasicCameraView(cameraView3, BasicCameraViewAPI$Wonderjs.setActiveBasicCameraView(cameraView3, false, BasicCameraViewAPI$Wonderjs.setActiveBasicCameraView(cameraView2, true, BasicCameraViewAPI$Wonderjs.setActiveBasicCameraView(cameraView1, true, match$2[0]))));
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                            BasicCameraViewAPI$Wonderjs.isActiveBasicCameraView(cameraView1, state$1),
                                                            BasicCameraViewAPI$Wonderjs.isActiveBasicCameraView(cameraView2, state$1),
                                                            BasicCameraViewAPI$Wonderjs.isActiveBasicCameraView(cameraView3, state$1)
                                                          ]), /* tuple */[
                                                        false,
                                                        false,
                                                        true
                                                      ]);
                                          }));
                            }));
              }));
        Wonder_jest.describe("unactiveBasicCameraView", (function (param) {
                return Wonder_jest.test("unactive this one(not affect other ones)", (function (param) {
                              var match = BasicCameraViewAPI$Wonderjs.createBasicCameraView(state[0]);
                              var cameraView1 = match[1];
                              var match$1 = BasicCameraViewAPI$Wonderjs.createBasicCameraView(match[0]);
                              var cameraView2 = match$1[1];
                              var state$1 = BasicCameraViewAPI$Wonderjs.unactiveBasicCameraView(cameraView2, BasicCameraViewAPI$Wonderjs.setActiveBasicCameraView(cameraView2, true, BasicCameraViewAPI$Wonderjs.setActiveBasicCameraView(cameraView1, true, match$1[0])));
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                              BasicCameraViewAPI$Wonderjs.isActiveBasicCameraView(cameraView1, state$1),
                                              BasicCameraViewAPI$Wonderjs.isActiveBasicCameraView(cameraView2, state$1)
                                            ]), /* tuple */[
                                          true,
                                          false
                                        ]);
                            }));
              }));
        Wonder_jest.describe("getActiveBasicCameraView", (function (param) {
                Wonder_jest.test("test has none", (function (param) {
                        var match = BasicCameraViewAPI$Wonderjs.createBasicCameraView(state[0]);
                        var match$1 = BasicCameraViewAPI$Wonderjs.createBasicCameraView(match[0]);
                        var state$1 = BasicCameraViewAPI$Wonderjs.setActiveBasicCameraView(match$1[1], false, BasicCameraViewAPI$Wonderjs.setActiveBasicCameraView(match[1], false, match$1[0]));
                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](BasicCameraViewAPI$Wonderjs.getActiveBasicCameraView(state$1)), undefined);
                      }));
                Wonder_jest.test("test has one", (function (param) {
                        var match = BasicCameraViewAPI$Wonderjs.createBasicCameraView(state[0]);
                        var cameraView1 = match[1];
                        var match$1 = BasicCameraViewAPI$Wonderjs.createBasicCameraView(match[0]);
                        var state$1 = BasicCameraViewAPI$Wonderjs.setActiveBasicCameraView(match$1[1], false, BasicCameraViewAPI$Wonderjs.setActiveBasicCameraView(cameraView1, true, match$1[0]));
                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](BasicCameraViewAPI$Wonderjs.getActiveBasicCameraView(state$1)), cameraView1);
                      }));
                return Wonder_jest.test("if has >= 2, contract error", (function (param) {
                              var match = BasicCameraViewAPI$Wonderjs.createBasicCameraView(state[0]);
                              var match$1 = BasicCameraViewAPI$Wonderjs.createBasicCameraView(match[0]);
                              var state$1 = BasicCameraViewAPI$Wonderjs.setActiveBasicCameraView(match$1[1], true, BasicCameraViewAPI$Wonderjs.setActiveBasicCameraView(match[1], true, match$1[0]));
                              return Wonder_jest.Expect[/* toThrowMessage */21]("expect only has one active cameraView at most", Wonder_jest.Expect[/* expect */0]((function (param) {
                                                return BasicCameraViewAPI$Wonderjs.getActiveBasicCameraView(state$1);
                                              })));
                            }));
              }));
        return Wonder_jest.describe("dispose component", (function (param) {
                      var _prepareTwo = function (state) {
                        var match = CameraTool$Wonderjs.createCameraGameObject(state);
                        var match$1 = CameraTool$Wonderjs.createCameraGameObject(match[0]);
                        return /* tuple */[
                                match$1[0],
                                match[1],
                                match[3][0],
                                match$1[1],
                                match$1[3][0]
                              ];
                      };
                      Wonder_jest.describe("dispose data", (function (param) {
                              return Wonder_jest.test("remove from isActiveMap, gameObjectMap", (function (param) {
                                            var match = CameraTool$Wonderjs.createCameraGameObject(state[0]);
                                            var basicCameraView1 = match[3][0];
                                            var state$1 = GameObjectTool$Wonderjs.disposeGameObjectBasicCameraViewComponent(match[1], basicCameraView1, match[0]);
                                            var match$1 = state$1[/* basicCameraViewRecord */13];
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                            MutableSparseMapService$WonderCommonlib.has(basicCameraView1, match$1[/* isActiveMap */1]),
                                                            MutableSparseMapService$WonderCommonlib.has(basicCameraView1, match$1[/* gameObjectMap */2])
                                                          ]), /* tuple */[
                                                        false,
                                                        false
                                                      ]);
                                          }));
                            }));
                      Wonder_jest.describe("test add new one after dispose old one", (function (param) {
                              Wonder_jest.test("use disposed index as new index firstly", (function (param) {
                                      var match = _prepareTwo(state[0]);
                                      var basicCameraView1 = match[2];
                                      var state$1 = GameObjectTool$Wonderjs.disposeGameObjectBasicCameraViewComponent(match[1], basicCameraView1, match[0]);
                                      var match$1 = CameraTool$Wonderjs.createCameraGameObject(state$1);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](match$1[3][0]), basicCameraView1);
                                    }));
                              return Wonder_jest.test("if has no disposed index, get index from meshRendererRecord.index", (function (param) {
                                            var match = _prepareTwo(state[0]);
                                            var basicCameraView1 = match[2];
                                            var state$1 = GameObjectTool$Wonderjs.disposeGameObjectBasicCameraViewComponent(match[1], basicCameraView1, match[0]);
                                            var match$1 = CameraTool$Wonderjs.createCameraGameObject(state$1);
                                            var match$2 = CameraTool$Wonderjs.createCameraGameObject(match$1[0]);
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                            match$1[3][0],
                                                            match$2[3][0]
                                                          ]), /* tuple */[
                                                        basicCameraView1,
                                                        match[4] + 1 | 0
                                                      ]);
                                          }));
                            }));
                      return Wonder_jest.describe("contract check", (function (param) {
                                    return Wonder_jest.test("expect dispose the alive component, but actual not", (function (param) {
                                                  var match = _prepareTwo(state[0]);
                                                  var basicCameraView1 = match[2];
                                                  var gameObject1 = match[1];
                                                  var state$1 = GameObjectTool$Wonderjs.disposeGameObjectBasicCameraViewComponent(gameObject1, basicCameraView1, match[0]);
                                                  return Wonder_jest.Expect[/* toThrowMessage */21]("expect dispose the alive component, but actual not", Wonder_jest.Expect[/* expect */0]((function (param) {
                                                                    GameObjectTool$Wonderjs.disposeGameObjectBasicCameraViewComponent(gameObject1, basicCameraView1, state$1);
                                                                    return /* () */0;
                                                                  })));
                                                }));
                                  }));
                    }));
      }));

export {
  
}
/*  Not a pure module */
